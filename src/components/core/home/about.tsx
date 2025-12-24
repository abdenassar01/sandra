import { Buttons, Title } from '@/components/common';
import { CheckmarkSquare01FreeIcons, CleanFreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import React from 'react';

export function About() {
	return (
		<div id="About" className="flex gap-4 flex-col md:flex-row">
			<Image
				src="/images/about.png"
				alt="About Us"
				width={500}
				height={500}
				className="md:w-1/2 w-full aspect-square rounded-2xl object-cover"
			/>
			<div className="bg-background-secondary flex flex-col gap-2 rounded-2xl p-2 w-full md:w-1/2">
				<Title icon={<HugeiconsIcon icon={CleanFreeIcons} />} title="About Us" />
				<h2 className="text-2xl md:text-4xl font-bold mb-4">Bringing Freshless, Confort and Care to Every Home</h2>

				<div className="flex flex-col gap-4 text-black/70">
					<p className="">
						At Santa’s Clean Services, we bring the same joy and freshness of the holiday season to your home all year long! Our
						mission is simple: make your space shine so you can enjoy more time with the people and things you love.
					</p>
					<p className="">
						We’re a team of friendly, reliable cleaners who treat your home with the same care as our own. Using eco-friendly
						supplies and modern cleaning techniques, we make every room sparkle — whether it’s your weekly clean, a deep
						refresh, or getting your new place ready before you move in.
					</p>

					<p className="">
						Fast, trustworthy, and always focused on quality, Santa’s Clean Services is here to deliver comfort, cleanliness,
						and peace of mind with every visit.
					</p>
				</div>
				<ul className="list-none text-primary font-medium">
					<li className="flex items-center gap-1">
						<HugeiconsIcon icon={CheckmarkSquare01FreeIcons} />
						<div className="">CheckmarkSquare01Icon</div>
					</li>
					<li className="flex items-center gap-1">
						<HugeiconsIcon icon={CheckmarkSquare01FreeIcons} />
						<div className="">We Clean Your Home</div>
					</li>
					<li className="flex items-center gap-1">
						<HugeiconsIcon icon={CheckmarkSquare01FreeIcons} />
						<div className="">Relax & Enjoy</div>
					</li>
				</ul>
				<div className="mt-auto">
					<Buttons />
				</div>
			</div>
		</div>
	);
}
