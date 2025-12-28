import { NextRequest, NextResponse } from 'next/server';
import { reviewsDb } from '@/lib/db';
import { getSession } from '@/lib/admin/session';

// PATCH to approve a review
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id } = await params;
		const body = await request.json();
		const { action } = body;

		if (action === 'approve') {
			const success = reviewsDb.approveReview(Number(id));
			if (!success) {
				return NextResponse.json({ error: 'Review not found' }, { status: 404 });
			}
			return NextResponse.json({ success: true });
		}

		return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
	} catch (error) {
		console.error('Update review error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// DELETE a review
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id } = await params;
		const success = reviewsDb.deleteReview(Number(id));

		if (!success) {
			return NextResponse.json({ error: 'Review not found' }, { status: 404 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Delete review error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
