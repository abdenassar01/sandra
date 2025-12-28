import React from 'react';
import { Buttons } from '@/components';
import { getScopedI18n } from '@/lib/i18n/server';

export async function HeroSection() {
	const t = await getScopedI18n('home.hero');

	return (
		<section id="#Home" className="relative h-[calc(100svh-120px)] rounded-2xl overflow-hidden">
			<div className="absolute inset-0">
				<div className="w-full h-full bg-[url('/images/hero.webp')] bg-cover bg-center bg-no-repeat" />
				<div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-[rgba(34,43,139,0.3)]"></div>
				<div className="absolute inset-0 bg-linear-to-t from-[rgba(144,172,238,0.2)] to-transparent"></div>
			</div>

			{/* Content */}
			<div className="relative h-full flex items-end">
				<div className="p-4 w-full">
					<div className="">
						<h1 className="text-2xl md:text-6xl font-bold text-white mb-2">
							{t('title1')}
							<br />
							<span className="text-primary">{t('title2')}</span>
							<br />
							{t('title3')}
						</h1>
						<p className="text-white/90 mb-2 leading-relaxed">{t('description')}</p>
						<Buttons />
					</div>
				</div>
			</div>
		</section>
	);
}
