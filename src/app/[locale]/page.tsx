import type { Metadata } from 'next';
import { About, HeroSection, ServicesSection, WhyChooseUsSection, TestimonialsSection, FAQSection } from '@/components';
import { StructuredData, createBreadcrumbStructuredData } from '@/lib/seo';

export const metadata: Metadata = {
	title: 'Home',
	description:
		'Expert cleaning solutions for your home and office. Quality service, reliable results, and complete satisfaction guaranteed. Get your free quote today!',
	keywords: [
		'home cleaning',
		'professional cleaning',
		'house cleaning services',
		'office cleaning',
		'deep cleaning',
		'move in cleaning',
		'move out cleaning',
		'eco-friendly cleaning',
		'reliable cleaners',
	],
};

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	return (
		<>
			<StructuredData data={createBreadcrumbStructuredData([{ name: 'Home', url: process.env.SITE_URL! }])} />

			<div className="flex flex-col gap-4">
				<HeroSection />
				<About />
				<ServicesSection />
				<WhyChooseUsSection />
				<TestimonialsSection />
				<FAQSection locale={locale} />
			</div>
		</>
	);
}
