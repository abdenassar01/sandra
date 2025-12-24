import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	Home01FreeIcons,
	Building04FreeIcons,
	SparklesFreeIcons,
	Wrench01FreeIcons,
	LinkSquare02FreeIcons,
} from '@hugeicons/core-free-icons';
import { StructuredData, createBreadcrumbStructuredData } from '@/lib/seo';

const servicesDir = path.join(process.cwd(), 'src/app/services/content');

const serviceInfo = [
	{
		slug: 'house-cleaning',
		title: 'House Cleaning',
		description: 'Complete home cleaning services tailored to your needs. From regular maintenance to deep cleaning.',
		icon: Home01FreeIcons,
		features: ['Room by room cleaning', 'Kitchen & bathroom sanitization', 'Floor care', 'Window cleaning'],
	},
	{
		slug: 'office-cleaning',
		title: 'Office Cleaning',
		description: 'Professional office cleaning services to create a productive and healthy work environment.',
		icon: Building04FreeIcons,
		features: ['Work area sanitization', 'Common area cleaning', 'Restroom maintenance', 'Waste disposal'],
	},
	{
		slug: 'deep-cleaning',
		title: 'Deep Cleaning',
		description: 'Intensive cleaning service for a thorough and detailed clean of every corner of your space.',
		icon: SparklesFreeIcons,
		features: ['Detailed cleaning', 'Hard-to-reach areas', 'Appliance cleaning', 'Baseboards & trim'],
	},
	{
		slug: 'post-construction',
		title: 'Post-Construction',
		description: 'Specialized cleaning services after construction or renovation projects.',
		icon: Wrench01FreeIcons,
		features: ['Dust removal', 'Debris cleanup', 'Surface polishing', 'Final touch-ups'],
	},
];

export const metadata: Metadata = {
	title: 'Services',
	description:
		'Explore our comprehensive cleaning services including house cleaning, office cleaning, deep cleaning, and post-construction cleaning.',
	keywords: [
		'cleaning services',
		'house cleaning',
		'office cleaning',
		'deep cleaning',
		'post-construction cleaning',
		'commercial cleaning',
		'residential cleaning',
		'professional cleaners',
	],
};

export default function ServicesPage() {
	return (
		<>
			{/* Structured Data */}
			<StructuredData
				data={createBreadcrumbStructuredData([
					{ name: 'Home', url: 'https://sandracleaning.com' },
					{ name: 'Services', url: 'https://sandracleaning.com/services' },
				])}
			/>

			<div className="flex flex-col gap-4">
				{/* Header */}
				<div className="text-center py-8 md:py-12">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						Our <span className="text-primary">Services</span>
					</h1>
					<p className="text-text/70 max-w-2xl mx-auto">
						We offer comprehensive cleaning solutions designed to meet your specific needs and exceed your expectations.
					</p>
				</div>

				{/* Services Grid */}
				<section className="py-8 md:py-12">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{serviceInfo.map((service) => (
								<Link
									key={service.slug}
									href={`/services/${service.slug}`}
									className="group bg-background-secondary rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-secondary/20"
								>
									{/* Icon */}
									<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
										<HugeiconsIcon icon={service.icon} className="w-8 h-8 text-primary" />
									</div>

									{/* Content */}
									<h3 className="text-xl font-semibold text-text mb-3">{service.title}</h3>
									<p className="text-text/70 mb-4 text-sm leading-relaxed">{service.description}</p>

									{/* Features List */}
									<ul className="space-y-2 mb-6">
										{service.features.map((feature) => (
											<li key={feature} className="flex items-center gap-2 text-sm text-text/60">
												<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
												{feature}
											</li>
										))}
									</ul>

									{/* Learn More Link */}
									<div className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
										Learn More
										<HugeiconsIcon icon={LinkSquare02FreeIcons} className="w-4 h-4" />
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-8 md:py-12 bg-black/5">
					<div className="container mx-auto px-4 text-center">
						<p className="text-text/70 mb-6">Need a custom cleaning solution?</p>
						<Link
							href="/contact"
							className="inline-flex items-center gap-2 rounded-xl text-white transition-all hover:scale-105 bg-primary hover:bg-primary/90 p-3 px-8 font-semibold"
						>
							Get Custom Quote
							<HugeiconsIcon icon={LinkSquare02FreeIcons} />
						</Link>
					</div>
				</section>
			</div>
		</>
	);
}
