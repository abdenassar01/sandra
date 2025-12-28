'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { HugeiconsIcon } from '@hugeicons/react';
import { User02FreeIcons, Mail01FreeIcons, StarFreeIcons } from '@hugeicons/core-free-icons';
import { useI18n } from '@/lib/i18n/client';

interface ReviewFormProps {
	onSubmit?: () => void;
}

interface SubmitReviewResponse {
	success: boolean;
	message?: string;
	error?: string;
}

async function submitReview(review: {
	name: string;
	email: string;
	rating: number;
	review: string;
}): Promise<SubmitReviewResponse> {
	const response = await fetch('/api/reviews', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(review),
	});

	if (!response.ok) {
		const data = await response.json();
		return { success: false, error: data.error || 'Failed to submit review' };
	}

	const data = await response.json();
	return { success: true, message: data.message };
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
	const t = useI18n();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: submitReview,
		onSuccess: (data) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ['reviews'] });
				onSubmit?.();
			}
		},
	});

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			rating: 5,
			review: '',
		},
		onSubmit: async ({ value }) => {
			await mutation.mutateAsync(value);
		},
	});

	return (
		<div className="bg-background-secondary rounded-2xl p-6 md:p-8 border border-secondary/20">
			<h3 className="text-2xl font-bold text-text mb-2">
				{t('contact.reviewForm.title').split(' ')[0]}{' '}
				<span className="text-primary">{t('contact.reviewForm.title').split(' ').slice(1).join(' ')}</span>
			</h3>
			<p className="text-text/70 mb-6 text-sm">{t('contact.reviewForm.description')}</p>

			{mutation.data?.success ? (
				<div className="p-4 rounded-xl mb-6 bg-green-100 text-green-800">
					{mutation.data.message || t('contact.reviewForm.successMessage')}
				</div>
			) : mutation.error ? (
				<div className="p-4 rounded-xl mb-6 bg-red-100 text-red-800">
					{mutation.error instanceof Error ? mutation.error.message : t('contact.reviewForm.errorMessage')}
				</div>
			) : mutation.data?.error ? (
				<div className="p-4 rounded-xl mb-6 bg-red-100 text-red-800">{mutation.data.error}</div>
			) : null}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="space-y-5"
			>
				{/* Name */}
				<form.Field
					name="name"
					children={(field) => (
						<div>
							<label htmlFor="review-name" className="block text-sm font-medium text-text mb-2">
								{t('contact.reviewForm.yourName')}
							</label>
							<div className="relative">
								<HugeiconsIcon
									icon={User02FreeIcons}
									className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40"
								/>
								<input
									id="review-name"
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder={t('contact.reviewForm.namePlaceholder')}
									required
									className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
								/>
							</div>
						</div>
					)}
				/>

				{/* Email */}
				<form.Field
					name="email"
					children={(field) => (
						<div>
							<label htmlFor="review-email" className="block text-sm font-medium text-text mb-2">
								{t('contact.reviewForm.emailAddress')}
							</label>
							<div className="relative">
								<HugeiconsIcon
									icon={Mail01FreeIcons}
									className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40"
								/>
								<input
									id="review-email"
									type="email"
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder={t('contact.reviewForm.emailPlaceholder')}
									required
									className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
								/>
							</div>
						</div>
					)}
				/>

				{/* Rating */}
				<form.Field
					name="rating"
					children={(field) => (
						<div>
							<label htmlFor="review-rating" className="block text-sm font-medium text-text mb-2">
								{t('contact.reviewForm.rating')}
							</label>
							<div className="flex gap-2">
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										type="button"
										onClick={() => field.handleChange(star)}
										className="p-2 transition-transform hover:scale-110"
									>
										<HugeiconsIcon
											icon={StarFreeIcons}
											className={`w-8 h-8 ${
												star <= field.state.value ? 'text-yellow-400 fill-yellow-400' : 'text-text/30'
											} transition-colors`}
										/>
									</button>
								))}
							</div>
						</div>
					)}
				/>

				{/* Review */}
				<form.Field
					name="review"
					children={(field) => (
						<div>
							<label htmlFor="review-text" className="block text-sm font-medium text-text mb-2">
								{t('contact.reviewForm.yourReview')}
							</label>
							<textarea
								id="review-text"
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder={t('contact.reviewForm.reviewPlaceholder')}
								required
								rows={5}
								className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all resize-none"
							/>
						</div>
					)}
				/>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={mutation.isPending}
					className="w-full inline-flex items-center justify-center gap-2 rounded-xl text-white transition-all hover:scale-105 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed p-3 px-8 font-semibold"
				>
					{mutation.isPending ? t('contact.reviewForm.submitting') : t('contact.reviewForm.submitReview')}
				</button>
			</form>
		</div>
	);
}
