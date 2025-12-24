'use client';

import React from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	Home01FreeIcons,
	Building04FreeIcons,
	LinkSquare02FreeIcons,
	Wrench01FreeIcons,
	SparklesFreeIcons,
} from '@hugeicons/core-free-icons';

const services = [
	{
		icon: Home01FreeIcons,
		title: 'House Cleaning',
		slug: 'house-cleaning',
		description: 'Complete home cleaning services tailored to your needs. From regular maintenance to deep cleaning.',
		features: ['Room by room cleaning', 'Kitchen & bathroom sanitization', 'Floor care', 'Window cleaning'],
	},
	{
		icon: Building04FreeIcons,
		title: 'Office Cleaning',
		slug: 'office-cleaning',
		description: 'Professional office cleaning services to create a productive and healthy work environment.',
		features: ['Work area sanitization', 'Common area cleaning', 'Restroom maintenance', 'Waste disposal'],
	},
	{
		icon: SparklesFreeIcons,
		title: 'Deep Cleaning',
		slug: 'deep-cleaning',
		description: 'Intensive cleaning service for a thorough and detailed clean of every corner of your space.',
		features: ['Detailed cleaning', 'Hard-to-reach areas', 'Appliance cleaning', 'Baseboards & trim'],
	},
	{
		icon: Wrench01FreeIcons,
		title: 'Post-Construction',
		slug: 'post-construction',
		description: 'Specialized cleaning services after construction or renovation projects.',
		features: ['Dust removal', 'Debris cleanup', 'Surface polishing', 'Final touch-ups'],
	},
];

export function ServicesSection() {
	return (
		<section id="Services" className="py-16 md:py-24">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						Our <span className="text-primary">Services</span>
					</h2>
					<p className="text-lg text-text/80 max-w-2xl mx-auto">
						We offer comprehensive cleaning solutions designed to meet your specific needs and exceed your expectations.
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{services.map((service) => (
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
							<div className="inline-flex items-center gap-2 text-primary group-hover:text-primary/80 transition-colors text-sm font-medium">
								Learn More
								<HugeiconsIcon icon={LinkSquare02FreeIcons} className="w-4 h-4" />
							</div>
						</Link>
					))}
				</div>

				{/* CTA Section */}
				<div className="mt-16 text-center">
					<p className="text-text/70 mb-6">Need a custom cleaning solution?</p>
					<a
						href="/contact"
						className="inline-flex items-center gap-2 rounded-xl text-sm text-black transition-all hover:scale-105 bg-primary hover:bg-primary/90 p-3 px-8 font-semibold"
					>
						Get Custom Quote
						<HugeiconsIcon icon={LinkSquare02FreeIcons} />
					</a>
				</div>
			</div>
		</section>
	);
}
