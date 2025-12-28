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
import { useI18n } from '@/lib/i18n/client';

const reasonIcons = {
	Shield01FreeIcons,
	StarFreeIcons,
	ClockFreeIcons,
	LeafFreeIcons,
	User02FreeIcons,
	AwardFreeIcons,
};

export function WhyChooseUsSection() {
	const t = useI18n();

	// Get all translations for reasons
	const reasons = [
		{
			icon: Shield01FreeIcons,
			iconKey: 'Shield01FreeIcons',
			title: t('home.whyChooseUs.fullyInsured.title' as any, {}),
			description: t('home.whyChooseUs.fullyInsured.description' as any, {}),
		},
		{
			icon: StarFreeIcons,
			iconKey: 'StarFreeIcons',
			title: t('home.whyChooseUs.expertCleaners.title' as any, {}),
			description: t('home.whyChooseUs.expertCleaners.description' as any, {}),
		},
		{
			icon: ClockFreeIcons,
			iconKey: 'ClockFreeIcons',
			title: t('home.whyChooseUs.onTimeService.title' as any, {}),
			description: t('home.whyChooseUs.onTimeService.description' as any, {}),
		},
		{
			icon: LeafFreeIcons,
			iconKey: 'LeafFreeIcons',
			title: t('home.whyChooseUs.ecoFriendly.title' as any, {}),
			description: t('home.whyChooseUs.ecoFriendly.description' as any, {}),
		},
		{
			icon: User02FreeIcons,
			iconKey: 'User02FreeIcons',
			title: t('home.whyChooseUs.customerFocused.title' as any, {}),
			description: t('home.whyChooseUs.customerFocused.description' as any, {}),
		},
		{
			icon: AwardFreeIcons,
			iconKey: 'AwardFreeIcons',
			title: t('home.whyChooseUs.satisfactionGuarantee.title' as any, {}),
			description: t('home.whyChooseUs.satisfactionGuarantee.description' as any, {}),
		},
	] as const;

	return (
		<section className="">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						{t('home.whyChooseUs.title').split(' ')[0]}{' '}
						<span className="text-primary">
							{t('home.whyChooseUs.title').split(' ').slice(1).join(' ')}
						</span>
					</h2>
					<p className="text-lg text-text/80 max-w-2xl mx-auto">{t('home.whyChooseUs.subtitle')}</p>
				</div>

				{/* Reasons Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{reasons.map((reason) => (
						<div key={reason.iconKey} className="text-center group">
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
							<div className="text-sm text-text/70">{t('home.whyChooseUs.stats.happyClients')}</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-2">5+ Years</div>
							<div className="text-sm text-text/70">{t('home.whyChooseUs.stats.inBusiness')}</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
							<div className="text-sm text-text/70">{t('home.whyChooseUs.stats.projectsDone')}</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
							<div className="text-sm text-text/70">{t('home.whyChooseUs.stats.support')}</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
