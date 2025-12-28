'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChangeLocale, useCurrentLocale } from '@/lib/i18n/client';

interface Language {
	code: string;
	name: string;
	flag: string;
}

const languages: Language[] = [
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function LanguageSwitcher() {
	const changeLocale = useChangeLocale();
	const currentLocale = useCurrentLocale();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const switchLanguage = (locale: 'en' | 'fr') => {
		changeLocale(locale);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="hover:bg-primary/20 bg-primary/10 flex items-center space-x-2 rounded-lg p-1 transition-colors focus:outline-none"
				aria-label="Toggle language"
				title="Language"
			>
				<span className="text-lg">{currentLanguage.flag}</span>
				<span className="hidden text-sm text-white font-medium md:block">{currentLanguage.code.toUpperCase()}</span>
				<svg
					className={`text-primary h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isOpen && (
				<div className="border-primary/10 bg-background-secondary absolute right-0 z-50 mt-2 w-48 rounded-lg border shadow-lg focus:outline-none">
					<div className="py-1">
						{languages.map((language) => (
							<button
								key={language.code}
								onClick={() => switchLanguage(language.code as 'en' | 'fr')}
								className={`hover:bg-primary/20 flex w-full items-center px-4 py-2 text-sm transition-colors ${
									currentLocale === language.code ? 'bg-primary/10 text-primary' : 'text-text'
								}`}
							>
								<span className="mr-3 text-lg">{language.flag}</span>
								<div className="flex flex-col items-start">
									<span className="font-medium">{language.name}</span>
									<span className="text-xs text-gray-500">{language.code.toUpperCase()}</span>
								</div>
								{currentLocale === language.code && (
									<svg className="text-primary ml-auto h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
										<path
											fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								)}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
