'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01FreeIcons } from '@hugeicons/core-free-icons';

export function ContactHeroSection() {
	return (
		<section className="relative h-[calc(100svh-120px)] rounded-2xl overflow-hidden">
			<div className="absolute inset-0">
				<div className="w-full h-full bg-[url('/images/hero.webp')] bg-cover bg-center bg-no-repeat" />
				<div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-[rgba(78,149,242,0.3)]"></div>
				<div className="absolute inset-0 bg-linear-to-t from-[rgba(96,165,250,0.2)] to-transparent"></div>
			</div>

			{/* Content */}
			<div className="relative h-full flex items-end">
				<div className="p-4 w-full">
					<div>
						<h1 className="text-2xl md:text-6xl font-bold text-white mb-2">
							Get In
							<br />
							<span className="text-primary">Touch</span>
						</h1>
						<p className="text-white/90 mb-6 leading-relaxed max-w-2xl">
							Ready to experience the best cleaning service? Contact us today for a free quote or to schedule your first
							cleaning. We're here to help!
						</p>
						<div className="flex items-center gap-2 text-secondary">
							<HugeiconsIcon icon={Mail01FreeIcons} className="w-5 h-5" />
							<span className="text-sm font-medium">info@sandracleaning.com</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
