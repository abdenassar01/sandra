import { Buttons, Title } from '@/components/common';
import { CheckmarkSquare01FreeIcons, CleanFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import React from 'react';
import { getScopedI18n } from '@/lib/i18n/server';

export async function About() {
	const t = await getScopedI18n('home.about');

	return (
		<div id="About" className="flex gap-4 flex-col md:flex-row">
			<Image
				src="/images/about.jpeg"
				alt="About Us"
				width={500}
				height={500}
				className="md:w-1/2 w-full aspect-square rounded-2xl object-cover"
			/>
			<div className="bg-background-secondary flex flex-col gap-2 rounded-2xl p-2 w-full md:w-1/2">
				<Title icon={<HugeiconsIcon icon={CleanFreeIcons} />} title={t('title')} />
				<h2 className="text-2xl md:text-4xl font-bold mb-4">{t('heading')}</h2>

				<div className="flex flex-col gap-4 text-black/70">
					<p className="">{t('paragraph1')}</p>
					<p className="">{t('paragraph2')}</p>
					<p className="">{t('paragraph3')}</p>
				</div>
				<ul className="list-none text-primary font-medium">
					<li className="flex items-center gap-1">
						<HugeiconsIcon icon={CheckmarkSquare01FreeIcons} />
						<div className="">{t('feature1')}</div>
					</li>
					<li className="flex items-center gap-1">
						<HugeiconsIcon icon={CheckmarkSquare01FreeIcons} />
						<div className="">{t('feature2')}</div>
					</li>
				</ul>
				<div className="mt-auto">
					<Buttons />
				</div>
			</div>
		</div>
	);
}
