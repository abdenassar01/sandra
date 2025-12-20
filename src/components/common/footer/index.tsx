'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	Mail01FreeIcons,
	Location01FreeIcons,
	LinkSquare02FreeIcons,
	Facebook01FreeIcons,
	Linkedin01FreeIcons,
	NewTwitterRectangleIcon,
	InstagramFreeIcons,
	Call02FreeIcons,
} from '@hugeicons/core-free-icons';
import { cn } from '@/utils';

const footerLinks = {
	quickLinks: [
		{ name: 'Home', href: '#Home' },
		{ name: 'About', href: '#About' },
		{ name: 'Services', href: '#Services' },
		{ name: 'Pricing', href: '#Pricing' },
	],
	services: [
		{ name: 'House Cleaning', href: '#' },
		{ name: 'Office Cleaning', href: '#' },
		{ name: 'Deep Cleaning', href: '#' },
		{ name: 'Post-Construction', href: '#' },
	],
	company: [
		{ name: 'About Us', href: '#About' },
		{ name: 'Contact', href: '/contact' },
		{ name: 'Privacy Policy', href: '#' },
		{ name: 'Terms of Service', href: '#' },
	],
};

const socialLinks = [
	{ icon: Facebook01FreeIcons, href: '#', label: 'Facebook' },
	{ icon: NewTwitterRectangleIcon, href: '#', label: 'Twitter' },
	{ icon: InstagramFreeIcons, href: '#', label: 'Instagram' },
	{ icon: Linkedin01FreeIcons, href: '#', label: 'LinkedIn' },
];

export function Footer() {
	return (
		<footer className="bg-black text-text rounded-t-3xl mt-12">
			<div className="container mx-auto px-4 py-8 md:py-12">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					{/* Company Info */}
					<div className="space-y-4">
						<div className="flex items-center gap-2 mb-4">
							<Image src="/logo.png" alt="Sandra Cleaning" width={40} height={40} className="w-10 h-10" />
							<span className="text-xl font-bold text-primary">Sandra Cleaning</span>
						</div>
						<p className="text-sm text-white leading-relaxed">
							Professional cleaning services that make your space shine. Quality, reliability, and attention to detail in every
							clean.
						</p>
						<div className="flex gap-3">
							{socialLinks.map((social) => (
								<Link
									key={social.label}
									href={social.href}
									className="w-10 h-10 rounded-lg group bg-secondary/10 hover:bg-primary/30 flex items-center justify-center transition-colors"
									aria-label={social.label}
								>
									<HugeiconsIcon icon={social.icon} className="w-5 h-5 text-white group-hover:text-primary" />
								</Link>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold text-secondary mb-4">Quick Links</h3>
						<ul className="space-y-2">
							{footerLinks.quickLinks.map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="text-sm text-secondary/80 hover:text-primary transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services */}
					<div>
						<h3 className="text-lg font-semibold text-secondary mb-4">Services</h3>
						<ul className="space-y-2">
							{footerLinks.services.map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="text-sm text-secondary/80 hover:text-primary transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact & CTA */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-secondary mb-4">Contact Us</h3>
						<div className="space-y-3">
							<div className="flex items-center gap-3 text-sm text-white/80">
								<HugeiconsIcon icon={Call02FreeIcons} className="w-4 h-4" />
								<span>+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center gap-3 text-sm text-white/80">
								<HugeiconsIcon icon={Mail01FreeIcons} className="w-4 h-4" />
								<span>info@sandracleaning.com</span>
							</div>
							<div className="flex items-center gap-3 text-sm text-white/80">
								<HugeiconsIcon icon={Location01FreeIcons} className="w-4 h-4" />
								<span>123 Clean Street, City, ST 12345</span>
							</div>
						</div>
						<Link
							href="/contact"
							className="inline-flex items-center gap-2 rounded-xl text-sm text-secondary transition-colors bg-secondary/10 hover:bg-secondary/30 p-3 px-6 w-full md:w-auto justify-center mt-4"
						>
							<span>Get Free Quote</span>
							<HugeiconsIcon icon={LinkSquare02FreeIcons} />
						</Link>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-secondary/20 mb-8"></div>

				{/* Bottom Footer */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-white">© 2024 Sandra Cleaning. All rights reserved.</p>
					<div className="flex flex-wrap gap-4 text-sm">
						{footerLinks.company.map((link) => (
							<Link key={link.name} href={link.href} className="text-white/60 hover:text-secondary/50 transition-colors">
								{link.name}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
