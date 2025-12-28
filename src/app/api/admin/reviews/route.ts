import { NextRequest, NextResponse } from 'next/server';
import { reviewsDb } from '@/lib/db';
import { getSession } from '@/lib/admin/session';

// GET all reviews (including pending)
export async function GET() {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const reviews = reviewsDb.getAllReviews();
		return NextResponse.json({ reviews });
	} catch (error) {
		console.error('Get reviews error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
