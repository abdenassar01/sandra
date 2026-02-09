import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Password hashing utilities
function hashPassword(password: string): string {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
	return `${salt}:${hash}`;
}

async function main() {
	console.log('Starting database seed...');

	// Check and seed reviews
	const reviewCount = await prisma.review.count();
	console.log(`Current review count: ${reviewCount}`);

	if (reviewCount === 0) {
		console.log('Seeding reviews...');
		const sampleReviews = [
			{
				name: 'Sarah Johnson',
				email: 'sarah.j@example.com',
				rating: 5,
				review: 'Sandras Cleaning transformed my home! Their attention to detail is amazing, and the team is always professional and punctual.',
				approved: true,
			},
			{
				name: 'Michael Chen',
				email: 'michael.chen@example.com',
				rating: 5,
				review: 'We have been using Sandras Cleaning for our office for over a year. They consistently deliver excellent service!',
				approved: true,
			},
			{
				name: 'Emily Rodriguez',
				email: 'emily.r@example.com',
				rating: 5,
				review: 'Outstanding service! Their deep cleaning service is worth every penny. Perfect for preparing properties for new tenants.',
				approved: true,
			},
		];

		for (const review of sampleReviews) {
			await prisma.review.create({ data: review });
		}
		console.log('✅ Sample reviews inserted successfully');
	} else {
		console.log('✅ Reviews already exist, skipping...');
	}

	// Check and seed admin user
	const adminCount = await prisma.adminUser.count();
	console.log(`Current admin count: ${adminCount}`);

	if (adminCount === 0) {
		console.log('Creating admin user...');
		const defaultPassword = hashPassword('admin123');
		await prisma.adminUser.create({
			data: {
				username: 'admin',
				passwordHash: defaultPassword,
			},
		});
		console.log('✅ Initial admin user created: username=admin, password=admin123');
	} else {
		console.log('✅ Admin user already exists, skipping...');
	}

	console.log('Database seed completed!');
}

main()
	.catch((e) => {
		console.error('Error seeding database:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
