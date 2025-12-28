import type { Metadata } from 'next';
import { ContactForm, ContactInfo } from '@/components/core/contact';
import { ReviewForm } from '@/components/common/review-form';
import { StructuredData, createBreadcrumbStructuredData } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';

export const metadata: Metadata = {
	title: 'Contact Us',
	description:
		'Get in touch with Sandra Cleaning for a free quote or to schedule your cleaning service. Call us at +1 (555) 123-4567 or email info@sandracleaning.com.',
	keywords: [
		'contact cleaning service',
		'cleaning quote',
		'book cleaning service',
		'cleaning service near me',
		'schedule cleaning',
		'cleaning contact',
	],
};

export default async function ContactUs({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getI18n();

	return (
		<>
			{/* Structured Data */}
			<StructuredData
				data={createBreadcrumbStructuredData([
					{ name: 'Home', url: 'https://sandracleaning.com' },
					{ name: 'Contact', url: 'https://sandracleaning.com/contact' },
				])}
			/>

			<div className="flex flex-col gap-2 container">
				{/* Header */}
				<div className="text-center py-4 md:py-8">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						{t('contact.title').split(' ')[0]}{' '}
						<span className="text-primary">{t('contact.title').split(' ').slice(1).join(' ')}</span>
					</h1>
					<p className="text-text/70 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
				</div>

				{/* Contact Info Cards */}
				<section className="py-4 md:py-4">
					<div className="">
						<ContactInfo />
					</div>
				</section>

				{/* Contact Form Section */}
				<section className="py-3 ">
					<div className="">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div className="lg:col-span-2">
								<ContactForm />
							</div>

							{/* Side Info Card */}
							<div className="bg-background-secondary rounded-2xl p-6 border border-secondary/20">
								<h3 className="text-xl font-semibold text-text mb-4">
									{t('contact.whyChoose.title').split(' ').slice(0, 2).join(' ')}{' '}
									<span className="text-primary">{t('contact.whyChoose.title').split(' ').slice(2).join(' ')}</span>
								</h3>
								<ul className="space-y-3 text-sm text-text/70">
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
										<span>{t('contact.whyChoose.reason1')}</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
										<span>{t('contact.whyChoose.reason2')}</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
										<span>{t('contact.whyChoose.reason3')}</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
										<span>{t('contact.whyChoose.reason4')}</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
										<span>{t('contact.whyChoose.reason5')}</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0"></div>
										<span>{t('contact.whyChoose.reason6')}</span>
									</li>
								</ul>

								<div className="mt-6 p-4 bg-primary/10 rounded-xl">
									<p className="text-sm text-text font-medium mb-1">{t('contact.whyChoose.needHelp')}</p>
									<p className="text-xs text-text/60 mb-3">{t('contact.whyChoose.needHelpDescription')}</p>
									<a href="tel:+15551234567" className="text-primary font-semibold text-sm hover:underline">
										{t('contact.info.phoneValue')}
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Review Form Section */}
				<section id="review" className="py-8 md:py-12">
					<div className="container mx-auto px-4">
						<div className="max-w-2xl mx-auto">
							<ReviewForm />
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
