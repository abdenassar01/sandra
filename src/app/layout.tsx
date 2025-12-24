import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Footer, Header } from '@/components';
import { StructuredData, createOrganizationStructuredData, createLocalBusinessStructuredData } from '@/lib/seo';

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
	title: {
		default: 'Sandra Cleaning - Professional Cleaning Services',
		template: '%s | Sandra Cleaning',
	},
	description:
		'Professional cleaning services for your home and office. Quality service, reliable results, and complete satisfaction guaranteed. Get a free quote today!',
	keywords: [
		'cleaning services',
		'house cleaning',
		'office cleaning',
		'deep cleaning',
		'post-construction cleaning',
		'professional cleaners',
		'commercial cleaning',
		'residential cleaning',
		'maid service',
		'eco-friendly cleaning',
	],
	authors: [{ name: 'Sandra Cleaning' }],
	creator: 'Sandra Cleaning',
	publisher: 'Sandra Cleaning',
	metadataBase: new URL('https://sandracleaning.com'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://sandracleaning.com',
		siteName: 'Sandra Cleaning',
		title: 'Sandra Cleaning - Professional Cleaning Services',
		description:
			'Professional cleaning services for your home and office. Quality service, reliable results, and complete satisfaction guaranteed.',
		images: [
			{
				url: '/images/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Sandra Cleaning - Professional Cleaning Services',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Sandra Cleaning - Professional Cleaning Services',
		description:
			'Professional cleaning services for your home and office. Quality service, reliable results, and complete satisfaction guaranteed.',
		images: ['/images/og-image.jpg'],
		creator: '@sandracleaning',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<meta name="theme-color" content="#4e95f2" />
			</head>
			<body className={`${poppins.variable} antialiased bg-background`}>
				{/* Structured Data */}
				<StructuredData data={createOrganizationStructuredData()} />
				<StructuredData data={createLocalBusinessStructuredData()} />

				<div className="container flex flex-col gap-4">
					<Header />
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
