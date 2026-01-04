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
import { useI18n } from '@/lib/i18n/client';

const serviceIcons = {
	house: Home01FreeIcons,
	office: Building04FreeIcons,
	deep: SparklesFreeIcons,
	postConstruction: Wrench01FreeIcons,
};

const serviceImages = {
	house: '/images/house-cleaning.jpeg',
	office: '/images/office-cleaning.jpeg',
	deep: '/images/deep-cleaning.jpeg',
	postConstruction: '/images/post-cleaning.png',
};

const serviceSlugs = {
	house: 'house-cleaning',
	office: 'office-cleaning',
	deep: 'deep-cleaning',
	postConstruction: 'post-construction',
};

const serviceKeys = ['houseCleaning', 'officeCleaning', 'deepCleaning', 'postConstruction'] as const;

export function ServicesSection() {
	const t = useI18n();

	const houseTitle = t('home.services.houseCleaning.title' as any, {});
	const houseDesc = t('home.services.houseCleaning.description' as any, {});
	const houseFeatures = [
		t('home.services.houseCleaning.feature1' as any, {}),
		t('home.services.houseCleaning.feature2' as any, {}),
		t('home.services.houseCleaning.feature3' as any, {}),
		t('home.services.houseCleaning.feature4' as any, {}),
	];

	const officeTitle = t('home.services.officeCleaning.title' as any, {});
	const officeDesc = t('home.services.officeCleaning.description' as any, {});
	const officeFeatures = [
		t('home.services.officeCleaning.feature1' as any, {}),
		t('home.services.officeCleaning.feature2' as any, {}),
		t('home.services.officeCleaning.feature3' as any, {}),
		t('home.services.officeCleaning.feature4' as any, {}),
	];

	const deepTitle = t('home.services.deepCleaning.title' as any, {});
	const deepDesc = t('home.services.deepCleaning.description' as any, {});
	const deepFeatures = [
		t('home.services.deepCleaning.feature1' as any, {}),
		t('home.services.deepCleaning.feature2' as any, {}),
		t('home.services.deepCleaning.feature3' as any, {}),
		t('home.services.deepCleaning.feature4' as any, {}),
	];

	const postTitle = t('home.services.postConstruction.title' as any, {});
	const postDesc = t('home.services.postConstruction.description' as any, {});
	const postFeatures = [
		t('home.services.postConstruction.feature1' as any, {}),
		t('home.services.postConstruction.feature2' as any, {}),
		t('home.services.postConstruction.feature3' as any, {}),
		t('home.services.postConstruction.feature4' as any, {}),
	];

	const services = [
		{
			key: 'house',
			iconKey: 'house',
			slug: 'house-cleaning',
			title: houseTitle,
			description: houseDesc,
			features: houseFeatures,
		},
		{
			key: 'office',
			iconKey: 'office',
			slug: 'office-cleaning',
			title: officeTitle,
			description: officeDesc,
			features: officeFeatures,
		},
		{ key: 'deep', iconKey: 'deep', slug: 'deep-cleaning', title: deepTitle, description: deepDesc, features: deepFeatures },
		{
			key: 'postConstruction',
			iconKey: 'postConstruction',
			slug: 'post-construction',
			title: postTitle,
			description: postDesc,
			features: postFeatures,
		},
	] as const;

	return (
		<section id="Services" className="py-16 md:py-24">
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						{t('home.services.title').split(' ')[0]}{' '}
						<span className="text-primary">{t('home.services.title').split(' ')[1]}</span>
					</h2>
					<p className="text-lg text-text/80 max-w-2xl mx-auto">{t('home.services.subtitle')}</p>
				</div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{services.map((service) => (
						<Link
							key={service.key}
							href={`/services/${service.slug}`}
							className="group bg-background-secondary rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-secondary/20"
						>
							{/* Service Image */}
							<div className="relative h-48 overflow-hidden bg-primary/5">
								<img
									src={serviceImages[service.iconKey as keyof typeof serviceImages]}
									alt={service.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>

							<div className="p-6">
								{/* Icon */}
								<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 -mt-14 relative z-10 border-4 border-background-secondary group-hover:bg-primary/20 transition-colors">
									<HugeiconsIcon
										icon={serviceIcons[service.iconKey as keyof typeof serviceIcons]}
										className="w-8 h-8 text-primary"
									/>
								</div>

							{/* Content */}
							<h3 className="text-xl font-semibold text-text mb-3">{service.title}</h3>
							<p className="text-text/70 mb-4 text-sm leading-relaxed">{service.description}</p>

							{/* Features List */}
							<ul className="space-y-2 mb-6">
								{service.features.map((feature, i) => (
									<li key={i} className="flex items-center gap-2 text-sm text-text/60">
										<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
										{feature}
									</li>
								))}
							</ul>

							{/* Learn More Link */}
							<div className="inline-flex items-center gap-2 text-primary group-hover:text-primary/80 transition-colors text-sm font-medium">
								{t('common.learnMore')}
								<HugeiconsIcon icon={LinkSquare02FreeIcons} className="w-4 h-4" />
							</div>
							</div>
						</Link>
					))}
				</div>

				{/* CTA Section */}
				<div className="mt-16 text-center">
					<p className="text-text/70 mb-6">{t('home.services.customQuote')}</p>
					<a
						href="/contact"
						className="inline-flex items-center gap-2 rounded-xl text-sm text-black transition-all hover:scale-105 bg-primary hover:bg-primary/90 p-3 px-8 font-semibold"
					>
						{t('home.services.getCustomQuote')}
						<HugeiconsIcon icon={LinkSquare02FreeIcons} />
					</a>
				</div>
			</div>
		</section>
	);
}
