'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { QuoteUpFreeIcons, StarFreeIcons } from '@hugeicons/core-free-icons';

const testimonials = [
	{
		name: 'Sarah Johnson',
		role: 'Homeowner',
		content:
			'Sandra Cleaning transformed my home! Their attention to detail is amazing, and the team is always professional and punctual. I highly recommend their services.',
		rating: 5,
		image: '/images/testimonials/testimonial-1.jpg',
	},
	{
		name: 'Michael Chen',
		role: 'Office Manager',
		content:
			'We have been using Sandra Cleaning for our office for over a year now. They consistently deliver excellent service and our workspace has never been cleaner.',
		rating: 5,
		image: '/images/testimonials/testimonial-2.jpg',
	},
	{
		name: 'Emily Rodriguez',
		role: 'Property Manager',
		content:
			'Outstanding service! Sandra Cleaning team goes above and beyond. Their deep cleaning service is worth every penny. Perfect for preparing properties for new tenants.',
		rating: 5,
		image: '/images/testimonials/testimonial-3.jpg',
	},
];

export function TestimonialsSection() {
	return (
		<section id="Testimonials" className="py-16 md:py-24">
			<div className="">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						What Our <span className="text-primary">Clients Say</span>
					</h2>
					<p className="text-lg text-text/80 max-w-2xl mx-auto">
						Don't just take our word for it. Here's what our satisfied customers have to say about our cleaning services.
					</p>
				</div>

				{/* Testimonials Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="bg-background-secondary rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-secondary/20"
						>
							{/* Quote Icon */}
							<div className="mb-4">
								<HugeiconsIcon icon={QuoteUpFreeIcons} className="w-8 h-8 text-primary/20" />
							</div>

							{/* Rating */}
							<div className="flex gap-1 mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<HugeiconsIcon key={i} icon={StarFreeIcons} className="w-5 h-5 text-primary fill-current" />
								))}
							</div>

							{/* Content */}
							<p className="text-text/80 mb-6 text-sm leading-relaxed">"{testimonial.content}"</p>

							{/* Author */}
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
									<span className="text-primary font-semibold text-lg">
										{testimonial.name
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</span>
								</div>
								<div>
									<div className="font-semibold text-text">{testimonial.name}</div>
									<div className="text-sm text-text/60">{testimonial.role}</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Bottom CTA */}
				<div className="mt-16 text-center bg-black rounded-3xl md:p-12">
					<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
						Ready to Experience <span className="text-primary">Professional Cleaning?</span>
					</h3>
					<p className="text-white/80 mb-8 max-w-2xl mx-auto">
						Join our satisfied customers and discover why Sandra Cleaning is the trusted choice for professional cleaning
						services.
					</p>
					<a
						href="/contact"
						className="inline-flex items-center gap-2 rounded-xl text-sm text-black transition-all hover:scale-105 bg-primary hover:bg-primary/90 p-3 px-8 font-semibold"
					>
						<HugeiconsIcon icon={QuoteUpFreeIcons} />
						Get Started Today
					</a>
				</div>
			</div>
		</section>
	);
}
