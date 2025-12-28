'use client';

import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n/client';
import { getScopedI18n } from '@/lib/i18n/server';

interface FAQ {
	question: string;
	answer: string;
}

interface FAQResponse {
	faqs: FAQ[];
}

async function fetchFAQs(locale?: string): Promise<FAQ[]> {
	const response = await fetch(`/api/faqs${locale ? `?locale=${locale}` : ''}`);
	if (!response.ok) {
		throw new Error('Failed to fetch FAQs');
	}
	const data: FAQResponse = await response.json();
	return data.faqs;
}

export async function FAQSection({ locale }: { locale?: string }) {
	const t = await getScopedI18n('home.faq');
	const faqs = await fetchFAQs(locale);

	const fallbackFAQs: FAQ[] = [
		{
			question: t('fallback1.question'),
			answer: t('fallback1.answer'),
		},
		{
			question: t('fallback2.question'),
			answer: t('fallback2.answer'),
		},
		{
			question: t('fallback3.question'),
			answer: t('fallback3.answer'),
		},
		{
			question: t('fallback4.question'),
			answer: t('fallback4.answer'),
		},
	];

	const displayFAQs = faqs.length > 0 ? faqs : fallbackFAQs;

	return (
		<section className="py-16 bg-background-secondary">
			<div className="container">
				<h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>
					{t('title')}
				</h2>
				<div className="max-w-3xl mx-auto space-y-4">
					{displayFAQs.map((faq, index) => (
						<div key={index} className="rounded-xl p-6 border border-primary/10 bg-background">
							<h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
								{faq.question}
							</h3>
							<p className="text-text/70" style={{ color: 'var(--text)', opacity: 0.8 }}>
								{faq.answer}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
