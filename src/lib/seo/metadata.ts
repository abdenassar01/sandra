import type { Metadata } from 'next';

interface SiteMetadata {
	title: string;
	description: string;
	image?: string;
	keywords?: string[];
	author?: string;
	url?: string;
}

const defaultSiteMetadata = {
	title: 'Sandra Cleaning - Professional Cleaning Services',
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
	author: 'Sandra Cleaning',
	url: 'https://sandracleaning.com',
};

export function createMetadata({
	title,
	description,
	image,
	keywords,
	author,
	url,
}: SiteMetadata): Metadata {
	const fullTitle = title ? `${title} | Sandra Cleaning` : defaultSiteMetadata.title;
	const finalDescription = description || defaultSiteMetadata.description;
	const finalKeywords = keywords || defaultSiteMetadata.keywords;
	const finalAuthor = author || defaultSiteMetadata.author;
	const finalUrl = url || defaultSiteMetadata.url;

	return {
		title: fullTitle,
		description: finalDescription,
		keywords: finalKeywords,
		authors: [{ name: finalAuthor }],
		creator: finalAuthor,
		openGraph: {
			type: 'website',
			locale: 'en_US',
			url: finalUrl,
			title: fullTitle,
			description: finalDescription,
			siteName: 'Sandra Cleaning',
			images: image
				? [
						{
							url: image,
							width: 1200,
							height: 630,
							alt: title,
						},
				  ]
				: [],
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description: finalDescription,
			images: image ? [image] : [],
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
		verification: {
			// Add your verification codes here
			// google: 'your-google-verification-code',
			// yandex: 'your-yandex-verification-code',
		},
	};
}

export const siteUrl = defaultSiteMetadata.url;
