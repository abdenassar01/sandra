import { NextRequest, NextResponse } from 'next/server';
import { faqDb } from '@/lib/db';
import { getSession } from '@/lib/admin/session';

// GET single FAQ
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { id } = await params;
		const faq = await faqDb.getFAQById(Number(id));

		if (!faq) {
			return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
		}

		return NextResponse.json({ faq });
	} catch (error) {
		console.error('Get FAQ error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// PUT update FAQ
export async function PUT(
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
		const { question, answer, locale, sort_order } = body;

		const success = await faqDb.updateFAQ(Number(id), {
			question,
			answer,
			locale,
			sort_order,
		});

		if (!success) {
			return NextResponse.json({ error: 'FAQ not found or no changes made' }, { status: 404 });
		}

		const updated = await faqDb.getFAQById(Number(id));
		return NextResponse.json({ faq: updated });
	} catch (error) {
		console.error('Update FAQ error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// DELETE FAQ
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
		const success = await faqDb.deleteFAQ(Number(id));

		if (!success) {
			return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Delete FAQ error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
