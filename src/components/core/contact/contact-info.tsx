'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	Call02FreeIcons,
	Mail01FreeIcons,
	Location01FreeIcons,
	ClockFreeIcons,
} from '@hugeicons/core-free-icons';

const contactItems = [
	{
		icon: Call02FreeIcons,
		title: 'Phone',
		value: '+1 (555) 123-4567',
		description: 'Mon-Fri from 8am to 6pm.',
	},
	{
		icon: Mail01FreeIcons,
		title: 'Email',
		value: 'info@sandracleaning.com',
		description: 'We respond within 24 hours.',
	},
	{
		icon: Location01FreeIcons,
		title: 'Address',
		value: '123 Clean Street, City, ST 12345',
		description: 'Visit our office for consultation.',
	},
	{
		icon: ClockFreeIcons,
		title: 'Working Hours',
		value: 'Mon - Sat: 8:00 AM - 6:00 PM',
		description: 'Sunday: Closed',
	},
];

export function ContactInfo() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{contactItems.map((item) => (
				<div
					key={item.title}
					className="bg-background-secondary rounded-2xl p-6 border border-secondary/20 hover:shadow-lg transition-all duration-300"
				>
					{/* Icon */}
					<div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
						<HugeiconsIcon icon={item.icon} className="w-7 h-7 text-primary" />
					</div>

					{/* Content */}
					<h3 className="text-lg font-semibold text-text mb-2">{item.title}</h3>
					<p className="text-sm text-text font-medium mb-1">{item.value}</p>
					<p className="text-xs text-text/60">{item.description}</p>
				</div>
			))}
		</div>
	);
}
