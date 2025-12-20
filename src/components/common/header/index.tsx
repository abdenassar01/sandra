import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { LinkSquare02FreeIcons } from '@hugeicons/core-free-icons';

const routes = ['Home', 'About', 'Services', 'Pricing'];

export function Header() {
	return (
		<header className="rounded-2xl p-2 bg-black  my-2 flex justify-between items-center">
			<Image src="/logo.png" alt="logo" width={40} height={40} className="w-10 h-10" />
			<nav className="flex items-center gap-2">
				{routes.map((route) => (
					<Link key={route} href={`#${route}`} className="hover:text-primary text-sm text-secondary transition-colors">
						{route}
					</Link>
				))}
			</nav>
			<Link
				href="/contact"
				className="hover:bg-secondary/30 flex items-center gap-2 rounded-xl text-sm text-secondary transition-colors bg-secondary/10 p-2 px-4"
			>
				<div className="text-center">Contact Us</div>
				<HugeiconsIcon icon={LinkSquare02FreeIcons} />
			</Link>
		</header>
	);
}
