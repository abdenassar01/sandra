import { LinkSquare02FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import React from 'react';
import { useI18n } from '@/lib/i18n/client';

export function Buttons() {
	const t = useI18n();

	return (
		<div className="flex flex-col sm:flex-row gap-4">
			<Link
				href="/contact"
				className="inline-flex items-center gap-2 rounded-xl text-sm text-black transition-all hover:scale-105 bg-secondary hover:bg-secondary/90 p-3 px-8 justify-center font-semibold"
			>
				<span>{t('common.getFreeQuote')}</span>
				<HugeiconsIcon icon={LinkSquare02FreeIcons} />
			</Link>
			<Link
				href="/#services"
				className="inline-flex items-center gap-2 rounded-xl text-sm text-black hover:text-primary transition-all hover:bg-white/10 hover:scale-105 bg-transparent p-2 px-8 justify-center font-semibold"
			>
				<span>{t('common.ourServices')}</span>
			</Link>
		</div>
	);
}
