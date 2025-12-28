import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Use environment variable for database path, with a default that works in production
const dbDir = process.env.DATABASE_PATH || path.join(process.cwd(), 'data');
const dbFile = path.join(dbDir, 'reviews.db');

// Ensure the directory exists
if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbFile);

// Create reviews table if it doesn't exist
db.exec(`
	CREATE TABLE IF NOT EXISTS reviews (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL,
		rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
		review TEXT NOT NULL,
		approved INTEGER DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)
`);

// Create admin_users table if it doesn't exist
db.exec(`
	CREATE TABLE IF NOT EXISTS admin_users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT NOT NULL UNIQUE,
		password_hash TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)
`);

// Create admin_sessions table if it doesn't exist
db.exec(`
	CREATE TABLE IF NOT EXISTS admin_sessions (
		id TEXT PRIMARY KEY,
		user_id INTEGER NOT NULL,
		expires_at INTEGER NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
	)
`);

// Create faqs table if it doesn't exist
db.exec(`
	CREATE TABLE IF NOT EXISTS faqs (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		question TEXT NOT NULL,
		answer TEXT NOT NULL,
		locale TEXT DEFAULT 'en',
		sort_order INTEGER DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	)
`);

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

// Insert sample reviews if table is empty
const reviewCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get() as { count: number };
if (reviewCount.count === 0) {
	const sampleReviews = [
		{
			name: 'Sarah Johnson',
			email: 'sarah.j@example.com',
			rating: 5,
			review: 'Sandra Cleaning transformed my home! Their attention to detail is amazing, and the team is always professional and punctual.',
			approved: 1,
		},
		{
			name: 'Michael Chen',
			email: 'michael.chen@example.com',
			rating: 5,
			review: 'We have been using Sandra Cleaning for our office for over a year. They consistently deliver excellent service!',
			approved: 1,
		},
		{
			name: 'Emily Rodriguez',
			email: 'emily.r@example.com',
			rating: 5,
			review: 'Outstanding service! Their deep cleaning service is worth every penny. Perfect for preparing properties for new tenants.',
			approved: 1,
		},
	];

	const insertStmt = db.prepare(
		'INSERT INTO reviews (name, email, rating, review, approved) VALUES (?, ?, ?, ?, ?)',
	);
	sampleReviews.forEach((review) => {
		insertStmt.run(review.name, review.email, review.rating, review.review, review.approved);
	});
}

export interface Review {
	id?: number;
	name: string;
	email: string;
	rating: number;
	review: string;
	approved?: number;
	created_at?: string;
}

export const reviewsDb = {
	// Get all approved reviews
	getApprovedReviews(): Review[] {
		const stmt = db.prepare('SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC');
		return stmt.all() as Review[];
	},

	// Get all reviews (including pending)
	getAllReviews(): Review[] {
		const stmt = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC');
		return stmt.all() as Review[];
	},

	// Add a new review
	addReview(review: Omit<Review, 'id' | 'approved' | 'created_at'>): Review {
		const stmt = db.prepare(`
			INSERT INTO reviews (name, email, rating, review)
			VALUES (?, ?, ?, ?)
		`);
		const result = stmt.run(review.name, review.email, review.rating, review.review);
		return {
			id: result.lastInsertRowid as number,
			...review,
			approved: 0,
		};
	},

	// Approve a review
	approveReview(id: number): boolean {
		const stmt = db.prepare('UPDATE reviews SET approved = 1 WHERE id = ?');
		const result = stmt.run(id);
		return result.changes > 0;
	},

	// Delete a review
	deleteReview(id: number): boolean {
		const stmt = db.prepare('DELETE FROM reviews WHERE id = ?');
		const result = stmt.run(id);
		return result.changes > 0;
	},

	// Get review by ID
	getReviewById(id: number): Review | undefined {
		const stmt = db.prepare('SELECT * FROM reviews WHERE id = ?');
		return stmt.get(id) as Review | undefined;
	},
};

// Admin User interfaces and methods
export interface AdminUser {
	id?: number;
	username: string;
	password_hash?: string;
	created_at?: string;
}

// Session interface
export interface AdminSession {
	id: string;
	user_id: number;
	expires_at: number;
	created_at: string;
}

export const adminDb = {
	// Verify admin credentials
	verifyAdmin(username: string, password: string): AdminUser | null {
		const stmt = db.prepare('SELECT * FROM admin_users WHERE username = ?');
		const user = stmt.get(username) as AdminUser | undefined;
		if (!user || !user.password_hash) {
			return null;
		}
		if (verifyPassword(password, user.password_hash)) {
			return user;
		}
		return null;
	},

	// Get admin by ID
	getAdminById(id: number): AdminUser | undefined {
		const stmt = db.prepare('SELECT id, username FROM admin_users WHERE id = ?');
		return stmt.get(id) as AdminUser | undefined;
	},

	// Update admin password
	updateAdminPassword(id: number, newPassword: string): boolean {
		const passwordHash = hashPassword(newPassword);
		const stmt = db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?');
		const result = stmt.run(passwordHash, id);
		return result.changes > 0;
	},

	// Update admin username
	updateAdminUsername(id: number, newUsername: string): boolean {
		const stmt = db.prepare('UPDATE admin_users SET username = ? WHERE id = ?');
		const result = stmt.run(newUsername, id);
		return result.changes > 0;
	},

	// Create session
	createSession(sessionId: string, userId: number, expiresAt: number): void {
		const stmt = db.prepare('INSERT INTO admin_sessions (id, user_id, expires_at) VALUES (?, ?, ?)');
		stmt.run(sessionId, userId, expiresAt);
	},

	// Get session
	getSession(sessionId: string): AdminSession | undefined {
		const stmt = db.prepare('SELECT * FROM admin_sessions WHERE id = ?');
		return stmt.get(sessionId) as AdminSession | undefined;
	},

	// Delete session
	deleteSession(sessionId: string): boolean {
		const stmt = db.prepare('DELETE FROM admin_sessions WHERE id = ?');
		const result = stmt.run(sessionId);
		return result.changes > 0;
	},

	// Clean up expired sessions
	cleanupExpiredSessions(): number {
		const now = Date.now();
		const stmt = db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?');
		const result = stmt.run(now);
		return result.changes;
	},

	// Create initial admin if none exists
	createInitialAdmin(): void {
		const count = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number };
		if (count.count === 0) {
			const defaultPassword = hashPassword('admin123');
			db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('admin', defaultPassword);
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
	sort_order?: number;
	created_at?: string;
	updated_at?: string;
}

export const faqDb = {
	// Get all FAQs
	getAllFAQs(locale?: string): FAQ[] {
		if (locale) {
			const stmt = db.prepare('SELECT * FROM faqs WHERE locale = ? ORDER BY sort_order ASC, id ASC');
			return stmt.all(locale) as FAQ[];
		}
		const stmt = db.prepare('SELECT * FROM faqs ORDER BY sort_order ASC, id ASC');
		return stmt.all() as FAQ[];
	},

	// Get FAQ by ID
	getFAQById(id: number): FAQ | undefined {
		const stmt = db.prepare('SELECT * FROM faqs WHERE id = ?');
		return stmt.get(id) as FAQ | undefined;
	},

	// Create new FAQ
	createFAQ(faq: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>): FAQ {
		const stmt = db.prepare(`
			INSERT INTO faqs (question, answer, locale, sort_order)
			VALUES (?, ?, ?, ?)
		`);
		const result = stmt.run(faq.question, faq.answer, faq.locale || 'en', faq.sort_order || 0);
		return {
			id: result.lastInsertRowid as number,
			...faq,
		};
	},

	// Update FAQ
	updateFAQ(id: number, faq: Partial<Omit<FAQ, 'id' | 'created_at' | 'updated_at'>>): boolean {
		const fields: string[] = [];
		const values: (string | number)[] = [];

		if (faq.question !== undefined) {
			fields.push('question = ?');
			values.push(faq.question);
		}
		if (faq.answer !== undefined) {
			fields.push('answer = ?');
			values.push(faq.answer);
		}
		if (faq.locale !== undefined) {
			fields.push('locale = ?');
			values.push(faq.locale);
		}
		if (faq.sort_order !== undefined) {
			fields.push('sort_order = ?');
			values.push(faq.sort_order);
		}

		if (fields.length === 0) return false;

		fields.push('updated_at = CURRENT_TIMESTAMP');
		values.push(id);

		const stmt = db.prepare(`UPDATE faqs SET ${fields.join(', ')} WHERE id = ?`);
		const result = stmt.run(...values);
		return result.changes > 0;
	},

	// Delete FAQ
	deleteFAQ(id: number): boolean {
		const stmt = db.prepare('DELETE FROM faqs WHERE id = ?');
		const result = stmt.run(id);
		return result.changes > 0;
	},
};

// Initialize default admin user
adminDb.createInitialAdmin();

export default db;
