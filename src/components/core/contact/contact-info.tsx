'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	Call02FreeIcons,
	Mail01FreeIcons,
	Location01FreeIcons,
	ClockFreeIcons,
} from '@hugeicons/core-free-icons';
import { useI18n } from '@/lib/i18n/client';

export function ContactInfo() {
	const t = useI18n();

	const contactItems = [
		{
			icon: Call02FreeIcons,
			title: t('contact.info.phone'),
			value: t('contact.info.phoneValue'),
			description: t('contact.info.phoneDescription'),
		},
		{
			icon: Mail01FreeIcons,
			title: t('contact.info.email'),
			value: t('contact.info.emailValue'),
			description: t('contact.info.emailDescription'),
		},
		{
			icon: Location01FreeIcons,
			title: t('contact.info.address'),
			value: t('contact.info.addressValue'),
			description: t('contact.info.addressDescription'),
		},
		{
			icon: ClockFreeIcons,
			title: t('contact.info.workingHours'),
			value: t('contact.info.workingHoursValue'),
			description: t('contact.info.sundayClosed'),
		},
	];

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
