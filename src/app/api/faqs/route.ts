import { NextRequest, NextResponse } from 'next/server';
import { faqDb } from '@/lib/db';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const locale = searchParams.get('locale') || undefined;

		const faqs = await faqDb.getAllFAQs(locale);
		return NextResponse.json({ faqs });
	} catch (error) {
		console.error('Get FAQs error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
