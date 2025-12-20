'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	ClockFreeIcons,
	StarFreeIcons,
	LeafFreeIcons,
	AwardFreeIcons,
	Shield01FreeIcons,
	User02FreeIcons,
} from '@hugeicons/core-free-icons';

const reasons = [
	{
		icon: Shield01FreeIcons,
		title: 'Fully Insured',
		description: 'Your property is protected with our comprehensive insurance coverage.',
	},
	{
		icon: StarFreeIcons,
		title: 'Expert Cleaners',
		description: 'Trained professionals with years of experience in cleaning services.',
	},
	{
		icon: ClockFreeIcons,
		title: 'On Time Service',
		description: 'We respect your time and always arrive as scheduled.',
	},
	{
		icon: LeafFreeIcons,
		title: 'Eco-Friendly',
		description: 'Using environmentally safe cleaning products for a healthier space.',
	},
	{
		icon: User02FreeIcons,
		title: 'Customer Focused',
		description: 'Your satisfaction is our top priority, guaranteed.',
	},
	{
		icon: AwardFreeIcons,
		title: 'Satisfaction Guarantee',
		description: 'If you are not happy, we will reclean for free.',
	},
];

export function WhyChooseUsSection() {
	return (
		<section className="py-16 md:py-24 bg-black/5">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						Why <span className="text-primary">Choose Us</span>
					</h2>
					<p className="text-lg text-text/80 max-w-2xl mx-auto">
						We go above and beyond to deliver exceptional cleaning services that make your space shine.
					</p>
				</div>

				{/* Reasons Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{reasons.map((reason, index) => (
						<div key={reason.title} className="text-center group">
							{/* Icon Circle */}
							<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
								<HugeiconsIcon icon={reason.icon} className="w-10 h-10 text-primary" />
							</div>

							{/* Content */}
							<h3 className="text-xl font-semibold text-text mb-2">{reason.title}</h3>
							<p className="text-text/70 text-sm leading-relaxed max-w-xs mx-auto">{reason.description}</p>
						</div>
					))}
				</div>

				{/* Stats Section */}
				<div className="bg-background-secondary rounded-3xl p-8 md:p-12">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
							<div className="text-sm text-text/70">Happy Clients</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-2">5+ Years</div>
							<div className="text-sm text-text/70">In Business</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
							<div className="text-sm text-text/70">Projects Done</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
							<div className="text-sm text-text/70">Support</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
