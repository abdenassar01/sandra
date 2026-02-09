import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { StructuredData, createBreadcrumbStructuredData, createServiceStructuredData } from '@/lib/seo';
import { getI18n, getStaticParams } from '@/lib/i18n/server';
import { setStaticParamsLocale } from 'next-international/server';
import Image from 'next/image';

const servicesDir = path.join(process.cwd(), 'src/app/services/content');

const serviceImages: Record<string, string> = {
	'house-cleaning': '/images/house-cleaning.jpg',
	'office-cleaning': '/images/office-cleaning.jpeg',
	'deep-cleaning': '/images/deep-cleaning.jpeg',
	'post-construction': '/images/post-cleaning.png',
};

async function getServiceContent(slug: string, locale: string) {
	const fileName = locale === 'fr' ? `${slug}-fr.mdx` : `${slug}.mdx`;
	const filePath = path.join(servicesDir, fileName);

	if (!fs.existsSync(filePath)) {
		// Fallback to English if French version doesn't exist
		const fallbackPath = path.join(servicesDir, `${slug}.mdx`);
		if (!fs.existsSync(fallbackPath)) {
			return null;
		}
		return fs.readFileSync(fallbackPath, 'utf-8');
	}

	return fs.readFileSync(filePath, 'utf-8');
}

export async function generateStaticParams() {
	const files = fs.readdirSync(servicesDir);
	const slugs = files.filter((filename) => !filename.includes('-fr.mdx')).map((filename) => filename.replace('.mdx', ''));

	// Generate params for each locale and slug combination
	const localeParams = getStaticParams();

	return localeParams.flatMap((localeParam) =>
		slugs.map((slug) => ({
			...localeParam,
			slug,
		})),
	);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
	const { slug, locale } = await params;
	setStaticParamsLocale(locale);
	const content = await getServiceContent(slug, locale);

	if (!content) {
		return {
			title: 'Service Not Found',
		};
	}

	const titleMatch = content.match(/^# (.+)$/m);
	const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');

	const descriptionMatch = content.match(/^> "(.+)"$/m);
	const t = await getI18n();
	const description = descriptionMatch ? descriptionMatch[1] : t('home.services.subtitle');

	return {
		title,
		description,
		keywords: [title, `${title} service`, 'professional cleaning', 'sandra cleaning', slug, 'cleaning services'],
	};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
	const { slug, locale } = await params;
	setStaticParamsLocale(locale);
	const t = await getI18n();
	const content = await getServiceContent(slug, locale);

	if (!content) {
		notFound();
	}

	const titleMatch = content.match(/^# (.+)$/m);
	const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');

	const descriptionMatch = content.match(/^> "(.+)"$/m);
	const description = descriptionMatch ? descriptionMatch[1] : '';

	return (
		<>
			<StructuredData
				data={createBreadcrumbStructuredData([
					{ name: t('nav.home'), url: `https://sandrascleaning.com/${locale}` },
					{ name: t('nav.services'), url: `https://sandrascleaning.com/${locale}/services` },
					{ name: title, url: `https://sandrascleaning.com/${locale}/services/${slug}` },
				])}
			/>
			<StructuredData data={createServiceStructuredData(title, description)} />

			<div className="flex flex-col pt-6 gap-4 container px-0! ">
				<div className="relative">
					{serviceImages[slug] && (
						<div className="relative overflow-hidden rounded-2xl my-2 h-[70vh] w-full">
							<Image src={serviceImages[slug]} alt={title} width={4000} height={2000} className="w-full h-full object-cover" />
							<div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
						</div>
					)}
					<div className="text-center py-8 md:py-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/10 backdrop-blur-xl rounded-2xl border border-primary/20">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							<span className="text-white">{title}</span>
						</h1>
						<p className="text-white/60 max-w-2xl mx-auto">
							{locale === 'fr'
								? `Services professionnels de ${title.toLowerCase()} par Sandras Cleaning. Service de qualité, résultats fiables.`
								: `Professional ${title.toLowerCase()} services by Sandras Cleaning. Quality service, reliable results.`}
						</p>
					</div>
					{/* Scroll Indicator */}
					<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
						<span className="text-white/80 text-sm">{locale === 'fr' ? 'Défiler vers le bas' : 'Scroll down'}</span>
						<svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</div>
				</div>
				{/* Content */}
				<article className="bg-background-secondary rounded-2xl p-6 md:p-10 border border-secondary/20">
					<div className="prose prose-lg max-w-none prose-headings:text-text prose-p:text-text/80 prose-strong:text-text prose-a:text-primary prose-li:text-text/80">
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeRaw]}
							components={{
								h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mb-6 text-text">{children}</h1>,
								h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8 text-text">{children}</h2>,
								h3: ({ children }) => <h3 className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-text">{children}</h3>,
								p: ({ children }) => <p className="text-base text-text/80 leading-relaxed mb-4">{children}</p>,
								ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-text/80">{children}</ul>,
								ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-text/80">{children}</ol>,
								li: ({ children }) => <li className="text-text/80">{children}</li>,
								a: ({ children, href }) => (
									<a href={href} className="text-primary hover:text-primary/80 underline transition-colors">
										{children}
									</a>
								),
								strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
								em: ({ children }) => <em className="italic text-text/90">{children}</em>,
								blockquote: ({ children }) => (
									<blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-lg text-text/80">
										{children}
									</blockquote>
								),
								table: ({ children }) => <table className="w-full border-collapse mb-4">{children}</table>,
								thead: ({ children }) => <thead className="bg-primary/10">{children}</thead>,
								tbody: ({ children }) => <tbody>{children}</tbody>,
								tr: ({ children }) => <tr className="border-b border-secondary/20">{children}</tr>,
								th: ({ children }) => <th className="px-4 py-2 text-left text-text font-semibold">{children}</th>,
								td: ({ children }) => <td className="px-4 py-2 text-text/80">{children}</td>,
							}}
						>
							{content}
						</ReactMarkdown>
					</div>
				</article>
				{/* CTA Section */}
				<div className="text-center py-8">
					<p className="text-text/70 mb-6">{locale === 'fr' ? 'Prêt à réserver ce service?' : 'Ready to book this service?'}</p>
					<a
						href={`/${locale}/contact`}
						className="inline-flex items-center gap-2 rounded-xl text-white transition-all hover:scale-105 bg-primary hover:bg-primary/90 p-3 px-8 font-semibold"
					>
						{locale === 'fr' ? 'Obtenir un Devis Gratuit' : 'Get Free Quote'}
					</a>
				</div>
			</div>
		</>
	);
}
