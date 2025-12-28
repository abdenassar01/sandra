import { NextRequest, NextResponse } from 'next/server';
import { faqDb } from '@/lib/db';
import { getSession } from '@/lib/admin/session';

// GET all FAQs
export async function GET(request: NextRequest) {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const locale = searchParams.get('locale') || undefined;

		const faqs = faqDb.getAllFAQs(locale);
		return NextResponse.json({ faqs });
	} catch (error) {
		console.error('Get FAQs error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// POST create new FAQ
export async function POST(request: NextRequest) {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = await request.json();
		const { question, answer, locale, sort_order } = body;

		if (!question || !answer) {
			return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
		}

		const faq = faqDb.createFAQ({
			question,
			answer,
			locale: locale || 'en',
			sort_order: sort_order || 0,
		});

		return NextResponse.json({ faq }, { status: 201 });
	} catch (error) {
		console.error('Create FAQ error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
