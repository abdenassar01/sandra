import type { Metadata } from 'next';
import { About, HeroSection, ServicesSection, WhyChooseUsSection, TestimonialsSection } from '@/components';
import { StructuredData, createBreadcrumbStructuredData, createFAQStructuredData } from '@/lib/seo';

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

const faqs = [
	{
		question: 'What cleaning services do you offer?',
		answer:
			'We offer comprehensive cleaning services including house cleaning, office cleaning, deep cleaning, and post-construction cleaning tailored to your specific needs.',
	},
	{
		question: 'Are your cleaners insured and background-checked?',
		answer:
			'Yes, all our cleaners are fully insured, background-checked, and professionally trained to ensure your safety and peace of mind.',
	},
	{
		question: 'Do you use eco-friendly cleaning products?',
		answer:
			'Absolutely! We use environmentally safe, eco-friendly cleaning products that are tough on dirt but safe for your family, pets, and the environment.',
	},
	{
		question: 'How do I get a quote?',
		answer:
			'You can get a free quote by filling out our contact form or calling us directly at +1 (555) 123-4567. We provide transparent pricing with no hidden fees.',
	},
];

export default function Home() {
	return (
		<>
			<StructuredData data={createBreadcrumbStructuredData([{ name: 'Home', url: process.env.SITE_URL! }])} />
			<StructuredData data={createFAQStructuredData(faqs)} />

			<div className="flex flex-col gap-4">
				<HeroSection />
				<About />
				<ServicesSection />
				<WhyChooseUsSection />
				<TestimonialsSection />
			</div>
		</>
	);
}
