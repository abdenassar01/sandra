'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
	User02FreeIcons,
	Mail01FreeIcons,
	Building04FreeIcons,
	Message01FreeIcons,
	PhoneArrowUpFreeIcons,
	MailSend01FreeIcons,
} from '@hugeicons/core-free-icons';
import { useI18n } from '@/lib/i18n/client';

export function ContactForm() {
	const t = useI18n();

	return (
		<div className="bg-background-secondary rounded-2xl p-3 md:p-8 border border-secondary/20">
			<h2 className="text-2xl md:text-3xl font-bold mb-2">
				{t('contact.form.title').split(' ').slice(0, 2).join(' ')}{' '}
				<span className="text-primary">{t('contact.form.title').split(' ').slice(2).join(' ')}</span>
			</h2>
			<p className="text-text/70 mb-6 text-sm">{t('contact.form.description')}</p>

			<form className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Name */}
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-text mb-2">
							{t('contact.form.fullName')}
						</label>
						<div className="relative">
							<HugeiconsIcon icon={User02FreeIcons} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
							<input
								type="text"
								id="name"
								placeholder={t('contact.form.fullNamePlaceholder')}
								className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
							/>
						</div>
					</div>

					{/* Email */}
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-text mb-2">
							{t('contact.form.email')}
						</label>
						<div className="relative">
							<HugeiconsIcon icon={Mail01FreeIcons} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
							<input
								type="email"
								id="email"
								placeholder={t('contact.form.emailPlaceholder')}
								className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
							/>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Phone */}
					<div>
						<label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
							{t('contact.form.phone')}
						</label>
						<div className="relative">
							<HugeiconsIcon
								icon={PhoneArrowUpFreeIcons}
								className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40"
							/>
							<input
								type="tel"
								id="phone"
								placeholder={t('contact.form.phonePlaceholder')}
								className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
							/>
						</div>
					</div>

					{/* Service Type */}
					<div>
						<label htmlFor="service" className="block text-sm font-medium text-text mb-2">
							{t('contact.form.serviceType')}
						</label>
						<div className="relative">
							<HugeiconsIcon
								icon={Building04FreeIcons}
								className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40"
							/>
							<select
								id="service"
								className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all appearance-none"
							>
								<option value="">{t('contact.form.selectService')}</option>
								<option value="house">{t('contact.form.serviceHouse')}</option>
								<option value="office">{t('contact.form.serviceOffice')}</option>
								<option value="deep">{t('contact.form.serviceDeep')}</option>
								<option value="post-construction">{t('contact.form.servicePostConstruction')}</option>
							</select>
						</div>
					</div>
				</div>

				{/* Message */}
				<div>
					<label htmlFor="message" className="block text-sm font-medium text-text mb-2">
						{t('contact.form.message')}
					</label>
					<div className="relative">
						<HugeiconsIcon icon={Message01FreeIcons} className="absolute left-3 top-3 w-5 h-5 text-text/40" />
						<textarea
							id="message"
							rows={4}
							placeholder={t('contact.form.messagePlaceholder')}
							className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all resize-none"
						></textarea>
					</div>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full inline-flex items-center justify-center gap-2 rounded-xl text-sm text-white transition-all hover:scale-105 bg-primary hover:bg-primary/90 p-3 px-8 font-semibold"
				>
					<span>{t('contact.form.sendMessage')}</span>
					<HugeiconsIcon icon={MailSend01FreeIcons} />
				</button>
			</form>
		</div>
	);
}
