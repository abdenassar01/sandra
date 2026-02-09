import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

// Create a singleton instance of Prisma Client
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Password hashing utilities
export const hashPassword = (password: string): string => {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
	return `${salt}:${hash}`;
};

export const verifyPassword = (password: string, hashedPassword: string): boolean => {
	const [salt, hash] = hashedPassword.split(':');
	const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
	return hash === verifyHash;
};

export interface Review {
	id?: number;
	name: string;
	email: string;
	rating: number;
	review: string;
	approved?: boolean;
	createdAt?: Date;
}

export const reviewsDb = {
	// Get all approved reviews
	async getApprovedReviews(): Promise<Review[]> {
		const reviews = await prisma.review.findMany({
			where: { approved: true },
			orderBy: { createdAt: 'desc' },
		});
		return reviews.map((r) => ({
			id: r.id,
			name: r.name,
			email: r.email,
			rating: r.rating,
			review: r.review,
			approved: r.approved,
			createdAt: r.createdAt,
		}));
	},

	// Get all reviews (including pending)
	async getAllReviews(): Promise<Review[]> {
		const reviews = await prisma.review.findMany({
			orderBy: { createdAt: 'desc' },
		});
		return reviews.map((r) => ({
			id: r.id,
			name: r.name,
			email: r.email,
			rating: r.rating,
			review: r.review,
			approved: r.approved,
			createdAt: r.createdAt,
		}));
	},

	// Add a new review
	async addReview(review: Omit<Review, 'id' | 'approved' | 'createdAt'>): Promise<Review> {
		const newReview = await prisma.review.create({
			data: {
				name: review.name,
				email: review.email,
				rating: review.rating,
				review: review.review,
			},
		});
		return {
			id: newReview.id,
			...review,
			approved: newReview.approved,
		};
	},

	// Approve a review
	async approveReview(id: number): Promise<boolean> {
		try {
			await prisma.review.update({
				where: { id },
				data: { approved: true },
			});
			return true;
		} catch {
			return false;
		}
	},

	// Delete a review
	async deleteReview(id: number): Promise<boolean> {
		try {
			await prisma.review.delete({
				where: { id },
			});
			return true;
		} catch {
			return false;
		}
	},

	// Get review by ID
	async getReviewById(id: number): Promise<Review | undefined> {
		const review = await prisma.review.findUnique({
			where: { id },
		});
		if (!review) return undefined;
		return {
			id: review.id,
			name: review.name,
			email: review.email,
			rating: review.rating,
			review: review.review,
			approved: review.approved,
			createdAt: review.createdAt,
		};
	},
};

// Admin User interfaces and methods
export interface AdminUser {
	id?: number;
	username: string;
	passwordHash?: string;
	createdAt?: Date;
}

// Session interface
export interface AdminSession {
	id: string;
	userId: number;
	expiresAt: number;
	createdAt: Date;
}

export const adminDb = {
	// Verify admin credentials
	async verifyAdmin(username: string, password: string): Promise<AdminUser | null> {
		const user = await prisma.adminUser.findUnique({
			where: { username },
		});

		if (!user || !user.passwordHash) {
			return null;
		}
		if (verifyPassword(password, user.passwordHash)) {
			return {
				id: user.id,
				username: user.username,
				createdAt: user.createdAt,
			};
		}
		return null;
	},

	// Get admin by ID
	async getAdminById(id: number): Promise<AdminUser | undefined> {
		const user = await prisma.adminUser.findUnique({
			where: { id },
			select: {
				id: true,
				username: true,
				createdAt: true,
				passwordHash: true,
			},
		});
		return user || undefined;
	},

	// Update admin password
	async updateAdminPassword(id: number, newPassword: string): Promise<boolean> {
		try {
			const passwordHash = hashPassword(newPassword);
			await prisma.adminUser.update({
				where: { id },
				data: { passwordHash },
			});
			return true;
		} catch {
			return false;
		}
	},

	// Update admin username
	async updateAdminUsername(id: number, newUsername: string): Promise<boolean> {
		try {
			await prisma.adminUser.update({
				where: { id },
				data: { username: newUsername },
			});
			return true;
		} catch {
			return false;
		}
	},

	// Create session
	async createSession(sessionId: string, userId: number, expiresAt: number): Promise<void> {
		await prisma.adminSession.create({
			data: {
				id: sessionId,
				userId,
				expiresAt,
			},
		});
	},

	// Get session
	async getSession(sessionId: string): Promise<AdminSession | undefined> {
		const session = await prisma.adminSession.findUnique({
			where: { id: sessionId },
		});
		return session || undefined;
	},

	// Delete session
	async deleteSession(sessionId: string): Promise<boolean> {
		try {
			await prisma.adminSession.delete({
				where: { id: sessionId },
			});
			return true;
		} catch {
			return false;
		}
	},

	// Clean up expired sessions
	async cleanupExpiredSessions(): Promise<number> {
		const now = Date.now();
		const result = await prisma.adminSession.deleteMany({
			where: {
				expiresAt: {
					lt: now,
				},
			},
		});
		return result.count;
	},

	// Create initial admin if none exists
	async createInitialAdmin(): Promise<void> {
		const adminCount = await prisma.adminUser.count();

		if (adminCount === 0) {
			const defaultPassword = hashPassword('admin123');
			await prisma.adminUser.create({
				data: {
					username: 'admin',
					passwordHash: defaultPassword,
				},
			});
			console.log('Initial admin user created: username=admin, password=admin123');
		}
	},
};

// FAQ interfaces and methods
export interface FAQ {
	id?: number;
	question: string;
	answer: string;
	locale?: string;
	sortOrder?: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export const faqDb = {
	// Get all FAQs
	async getAllFAQs(locale?: string): Promise<FAQ[]> {
		const faqs = await prisma.fAQ.findMany({
			where: locale ? { locale } : undefined,
			orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
		});
		return faqs.map((f) => ({
			id: f.id,
			question: f.question,
			answer: f.answer,
			locale: f.locale,
			sortOrder: f.sortOrder,
			createdAt: f.createdAt,
			updatedAt: f.updatedAt,
		}));
	},

	// Get FAQ by ID
	async getFAQById(id: number): Promise<FAQ | undefined> {
		const faq = await prisma.fAQ.findUnique({
			where: { id },
		});
		return faq || undefined;
	},

	// Create new FAQ
	async createFAQ(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQ> {
		const newFAQ = await prisma.fAQ.create({
			data: {
				question: faq.question,
				answer: faq.answer,
				locale: faq.locale || 'en',
				sortOrder: faq.sortOrder || 0,
			},
		});
		return {
			id: newFAQ.id,
			question: newFAQ.question,
			answer: newFAQ.answer,
			locale: newFAQ.locale,
			sortOrder: newFAQ.sortOrder,
			createdAt: newFAQ.createdAt,
			updatedAt: newFAQ.updatedAt,
		};
	},

	// Update FAQ
	async updateFAQ(id: number, faq: Partial<Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> {
		try {
			await prisma.fAQ.update({
				where: { id },
				data: {
					...(faq.question !== undefined && { question: faq.question }),
					...(faq.answer !== undefined && { answer: faq.answer }),
					...(faq.locale !== undefined && { locale: faq.locale }),
					...(faq.sortOrder !== undefined && { sortOrder: faq.sortOrder }),
				},
			});
			return true;
		} catch {
			return false;
		}
	},

	// Delete FAQ
	async deleteFAQ(id: number): Promise<boolean> {
		try {
			await prisma.fAQ.delete({
				where: { id },
			});
			return true;
		} catch {
			return false;
		}
	},
};

export default prisma;
