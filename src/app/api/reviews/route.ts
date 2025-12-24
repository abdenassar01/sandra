import { NextRequest, NextResponse } from 'next/server';
import { reviewsDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/reviews - Fetch all approved reviews
export async function GET() {
	try {
		const reviews = reviewsDb.getApprovedReviews();
		return NextResponse.json({ success: true, reviews });
	} catch (error) {
		console.error('Error fetching reviews:', error);
		return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
	}
}

// POST /api/reviews - Submit a new review
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, rating, review } = body;

		// Validation
		if (!name || !email || !rating || !review) {
			return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
		}

		if (typeof rating !== 'number' || rating < 1 || rating > 5) {
			return NextResponse.json({ success: false, error: 'Rating must be between 1 and 5' }, { status: 400 });
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
		}

		if (name.length > 100 || email.length > 255 || review.length > 1000) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid input length (name max 100, email max 255, review max 1000 characters)',
				},
				{ status: 400 },
			);
		}

		// Add review to database
		const newReview = reviewsDb.addReview({
			name: name.trim(),
			email: email.trim(),
			rating,
			review: review.trim(),
		});

		return NextResponse.json({
			success: true,
			message: 'Review submitted successfully! It will be visible after approval.',
			review: {
				id: newReview.id,
				name: newReview.name,
				rating: newReview.rating,
				review: newReview.review,
			},
		});
	} catch (error) {
		console.error('Error submitting review:', error);
		return NextResponse.json({ success: false, error: 'Failed to submit review' }, { status: 500 });
	}
}
