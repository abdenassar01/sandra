import React from 'react';

interface StructuredDataProps {
	data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data),
			}}
		/>
	);
}

// Helper functions for creating structured data
export function createOrganizationStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Sandra Cleaning',
		description: 'Professional cleaning services for home and office.',
		url: 'https://sandracleaning.com',
		logo: 'https://sandracleaning.com/logo.png',
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+1-438-725-4115',
			contactType: 'Customer Service',
			email: 'Sandrascleaningservicesmtl@gmail.com',
			availableLanguage: 'English',
		},
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Montreal',
			addressLocality: 'Quebec',
			postalCode: 'QC',
			addressCountry: 'Canada',
		},
		sameAs: [
			'https://www.facebook.com/share/1JV4QmLkFg/?mibextid=wwXIfr',
			'https://www.twitter.com/sandracleaning',
			'https://www.instagram.com/sandracleaning',
			'https://www.linkedin.com/company/sandracleaning',
		],
	};
}

export function createLocalBusinessStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'Sandra Cleaning',
		description: 'Professional cleaning services for home and office.',
		url: 'https://sandracleaning.com',
		telephone: '+1-438-725-4115',
		email: 'Sandrascleaningservicesmtl@gmail.com',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Montreal',
			addressLocality: 'Quebec',
			postalCode: 'QC',
			addressCountry: 'Canada',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: '45.5017',
			longitude: '-73.5673',
		},
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			opens: '08:00',
			closes: '18:00',
		},
		priceRange: '$$',
	};
}

export function createServiceStructuredData(name: string, description: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: `Sandra Cleaning - ${name}`,
		description: description,
		provider: {
			'@type': 'Organization',
			name: 'Sandra Cleaning',
			url: 'https://sandracleaning.com',
		},
		areaServed: {
			'@type': 'GeoCircle',
			geoMidpoint: {
				'@type': 'GeoCoordinates',
				latitude: '45.5017',
				longitude: '-73.5673',
			},
			geoRadius: '50 mi',
		},
	};
}

export function createBreadcrumbStructuredData(items: { name: string; url: string }[]) {
	const listItemElements = items.map((item, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: item.name,
		item: item.url,
	}));

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: listItemElements,
	};
}

export function createFAQStructuredData(faqs: { question: string; answer: string }[]) {
	const mainEntity = faqs.map((faq) => ({
		'@type': 'Question',
		name: faq.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: faq.answer,
		},
	}));

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity,
	};
}
