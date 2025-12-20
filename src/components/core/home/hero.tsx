'use client';

import React from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { LinkSquare02FreeIcons } from '@hugeicons/core-free-icons';

export function HeroSection() {
	return (
		<section className="relative h-[calc(100svh-120px)] rounded-2xl overflow-hidden">
			<div className="absolute inset-0">
				<div className="w-full h-full bg-[url('/images/hero.webp')] bg-cover bg-center bg-no-repeat" />
				<div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-[rgba(34,139,34,0.3)]"></div>
				<div className="absolute inset-0 bg-linear-to-t from-[rgba(144,238,144,0.2)] to-transparent"></div>
			</div>

			{/* Content */}
			<div className="relative h-full flex items-end">
				<div className="p-4 w-full">
					<div className="">
						<h1 className="text-2xl md:text-6xl font-bold text-white mb-2">
							Professional
							<br />
							<span className="text-primary">Cleaning Services</span>
							<br />
							You Can Trust
						</h1>
						<p className="text-white/90 mb-2 leading-relaxed">
							Expert cleaning solutions for your home and office. Quality service, reliable results, and complete satisfaction
							guaranteed.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 rounded-xl text-sm text-black transition-all hover:scale-105 bg-secondary hover:bg-secondary/90 p-3 px-8 justify-center font-semibold"
							>
								<span>Get Free Quote</span>
								<HugeiconsIcon icon={LinkSquare02FreeIcons} />
							</Link>
							<Link
								href="#services"
								className="inline-flex items-center gap-2 rounded-xl text-sm text-secondary transition-all hover:bg-white/10 hover:scale-105 bg-transparent border border-secondary/50 p-3 px-8 justify-center font-semibold"
							>
								<span>Our Services</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
