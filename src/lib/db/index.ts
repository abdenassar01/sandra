import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

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

export default db;
