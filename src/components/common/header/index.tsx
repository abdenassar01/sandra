'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { LinkSquare02FreeIcons, Menu01FreeIcons, CancelCircleFreeIcons } from '@hugeicons/core-free-icons';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';

const routes = ['Home', 'About', 'Services', 'Pricing'];

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="rounded-2xl p-2 bg-black my-2 flex justify-between items-center relative">
			<Image src="/logo.png" alt="logo" width={40} height={40} className="w-10 h-10" />

			{/* Desktop Navigation */}
			<nav className="hidden md:flex items-center gap-2">
				{routes.map((route) => (
					<Link
						key={route}
						href={`#${route}`}
						className={cn(
							'text-sm transition-colors',
							typeof window !== 'undefined' && window.location.hash === `#${route}`
								? 'text-primary'
								: 'text-secondary hover:text-primary',
						)}
					>
						{route}
					</Link>
				))}
			</nav>

			<Link
				href="/contact"
				className="hidden md:flex hover:bg-secondary/30 items-center gap-2 rounded-xl text-sm text-secondary transition-colors bg-secondary/10 p-2 px-4"
			>
				<div className="text-center">Contact Us</div>
				<HugeiconsIcon icon={LinkSquare02FreeIcons} />
			</Link>

			<button
				onClick={toggleMenu}
				className="md:hidden text-secondary hover:text-primary transition-colors p-2"
				aria-label="Toggle menu"
			>
				<HugeiconsIcon icon={isMenuOpen ? CancelCircleFreeIcons : Menu01FreeIcons} className="w-6 h-6" />
			</button>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black rounded-2xl p-4 flex flex-col gap-4 z-50">
					<nav className="flex flex-col gap-3">
						{routes.map((route) => (
							<Link
								key={route}
								href={`#${route}`}
								className="hover:text-primary text-sm text-secondary transition-colors py-2"
								onClick={() => setIsMenuOpen(false)}
							>
								{route}
							</Link>
						))}
					</nav>
					<Link
						href="/contact"
						className="hover:bg-secondary/30 flex items-center justify-center gap-2 rounded-xl text-sm text-secondary transition-colors bg-secondary/10 p-3 w-full"
						onClick={() => setIsMenuOpen(false)}
					>
						<div className="text-center">Contact Us</div>
						<HugeiconsIcon icon={LinkSquare02FreeIcons} />
					</Link>
				</div>
			)}
		</header>
	);
}
