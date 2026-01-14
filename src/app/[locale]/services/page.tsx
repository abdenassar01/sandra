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
import { getI18n } from '@/lib/i18n/server';

const servicesDir = path.join(process.cwd(), 'src/app/services/content');

const serviceConfig = [
	{
		slug: 'house-cleaning',
		icon: Home01FreeIcons,
		image: '/images/house-cleaning.jpg',
		i18nKey: 'houseCleaning',
	},
	{
		slug: 'office-cleaning',
		icon: Building04FreeIcons,
		image: '/images/office-cleaning.jpeg',
		i18nKey: 'officeCleaning',
	},
	{
		slug: 'deep-cleaning',
		icon: SparklesFreeIcons,
		image: '/images/deep-cleaning.jpeg',
		i18nKey: 'deepCleaning',
	},
	{
		slug: 'post-construction',
		icon: Wrench01FreeIcons,
		image: '/images/post-cleaning.png',
		i18nKey: 'postConstruction',
	},
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const t = await getI18n();

	return {
		title: t('home.services.title'),
		description: t('home.services.subtitle'),
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
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getI18n();

	const serviceInfo = serviceConfig.map((service) => ({
		...service,
		title: t(`home.services.${service.i18nKey}.title` as any, {}),
		description: t(`home.services.${service.i18nKey}.description` as any, {}),
		features: [
			t(`home.services.${service.i18nKey}.feature1` as any, {}),
			t(`home.services.${service.i18nKey}.feature2` as any, {}),
			t(`home.services.${service.i18nKey}.feature3` as any, {}),
			t(`home.services.${service.i18nKey}.feature4` as any, {}),
		],
	}));

	const [title1, title2] = t('home.services.title').split(' ');

	return (
		<>
			{/* Structured Data */}
			<StructuredData
				data={createBreadcrumbStructuredData([
					{ name: t('nav.home'), url: `https://sandracleaning.com/${locale}` },
					{ name: t('nav.services'), url: `https://sandracleaning.com/${locale}/services` },
				])}
			/>

			<div className="flex flex-col gap-4">
				{/* Header */}
				<div className="text-center py-8 md:py-12">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						{title1} <span className="text-primary">{title2}</span>
					</h1>
					<p className="text-text/70 max-w-2xl mx-auto">{t('home.services.subtitle')}</p>
				</div>

				{/* Services Grid */}
				<section className="py-8 md:py-12">
					<div className="container mx-auto px-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{serviceInfo.map((service) => (
								<Link
									key={service.slug}
									href={`/${locale}/services/${service.slug}`}
									className="group bg-background-secondary rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-secondary/20"
								>
									{/* Service Image */}
									<div className="relative h-48 overflow-hidden bg-primary/5">
										<img
											src={service.image}
											alt={service.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>

									<div className="p-6">
										{/* Icon */}
										<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 -mt-14 relative z-10 border-4 border-background-secondary group-hover:bg-primary/20 transition-colors">
											<HugeiconsIcon icon={service.icon} className="w-8 h-8 text-primary" />
										</div>

										{/* Content */}
										<h3 className="text-xl font-semibold text-text mb-3">{service.title}</h3>
										<p className="text-text/70 mb-4 text-sm leading-relaxed">{service.description}</p>

										<ul className="space-y-2 mb-6">
											{service.features.map((feature) => (
												<li key={feature} className="flex items-center gap-2 text-sm text-text/60">
													<div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
													{feature}
												</li>
											))}
										</ul>

										<div className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
											{t('common.learnMore')}
											<HugeiconsIcon icon={LinkSquare02FreeIcons} className="w-4 h-4" />
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-8 md:py-12 bg-black/5">
					<div className="container mx-auto px-4 text-center">
						<p className="text-text/70 mb-6">{t('home.services.customQuote')}</p>
						<Link
							href={`/${locale}/contact`}
							className="inline-flex items-center gap-2 rounded-xl text-white transition-all hover:scale-105 bg-primary hover:bg-primary/90 p-3 px-8 font-semibold"
						>
							{t('home.services.getCustomQuote')}
							<HugeiconsIcon icon={LinkSquare02FreeIcons} />
						</Link>
					</div>
				</section>
			</div>
		</>
	);
}
