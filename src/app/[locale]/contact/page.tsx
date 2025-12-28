import type { Metadata } from 'next';
import { ContactForm, ContactInfo } from '@/components/core/contact';
import { ReviewForm } from '@/components/common/review-form';
import { StructuredData, createBreadcrumbStructuredData } from '@/lib/seo';

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

export default function ContactUs() {
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
						Contact <span className="text-primary">Us</span>
					</h1>
					<p className="text-text/70 max-w-2xl mx-auto">
						Get in touch with us for a free quote or to schedule your first cleaning. We're here to help!
					</p>
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
									Why Choose <span className="text-primary">Sandra Cleaning?</span>
								</h3>
								<ul className="space-y-3 text-sm text-text/70">
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
										<span>Free quotes with no obligation</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
										<span>Flexible scheduling to fit your needs</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
										<span>Fully insured and background-checked cleaners</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
										<span>Eco-friendly cleaning products</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
										<span>100% satisfaction guarantee</span>
									</li>
									<li className="flex items-start gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
										<span>Emergency cleaning available</span>
									</li>
								</ul>

								<div className="mt-6 p-4 bg-primary/10 rounded-xl">
									<p className="text-sm text-text font-medium mb-1">Need immediate assistance?</p>
									<p className="text-xs text-text/60 mb-3">Call us directly for urgent cleaning needs.</p>
									<a href="tel:+15551234567" className="text-primary font-semibold text-sm hover:underline">
										+1 (555) 123-4567
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
