'use client';

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { User02FreeIcons, Mail01FreeIcons, StarFreeIcons } from '@hugeicons/core-free-icons';

interface ReviewFormProps {
	onSubmit?: () => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		rating: 5,
		review: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setMessage(null);

		try {
			const response = await fetch('/api/reviews', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (data.success) {
				setMessage({ type: 'success', text: data.message });
				setFormData({ name: '', email: '', rating: 5, review: '' });
				onSubmit?.();
			} else {
				setMessage({ type: 'error', text: data.error || 'Failed to submit review' });
			}
		} catch (error) {
			setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-background-secondary rounded-2xl p-6 md:p-8 border border-secondary/20">
			<h3 className="text-2xl font-bold text-text mb-2">
				Leave a <span className="text-primary">Review</span>
			</h3>
			<p className="text-text/70 mb-6 text-sm">Share your experience with Sandra Cleaning services.</p>

			{message && (
				<div
					className={`p-4 rounded-xl mb-6 ${
						message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
					}`}
				>
					{message.text}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-5">
				{/* Name */}
				<div>
					<label htmlFor="review-name" className="block text-sm font-medium text-text mb-2">
						Your Name
					</label>
					<div className="relative">
						<HugeiconsIcon icon={User02FreeIcons} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
						<input
							type="text"
							id="review-name"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							placeholder="John Doe"
							required
							className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
						/>
					</div>
				</div>

				{/* Email */}
				<div>
					<label htmlFor="review-email" className="block text-sm font-medium text-text mb-2">
						Email Address
					</label>
					<div className="relative">
						<HugeiconsIcon icon={Mail01FreeIcons} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
						<input
							type="email"
							id="review-email"
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							placeholder="john@example.com"
							required
							className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all"
						/>
					</div>
				</div>

				{/* Rating */}
				<div>
					<label htmlFor="review-rating" className="block text-sm font-medium text-text mb-2">
						Rating
					</label>
					<div className="flex gap-2">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								type="button"
								onClick={() => setFormData({ ...formData, rating: star })}
								className="p-2 transition-transform hover:scale-110"
							>
								<HugeiconsIcon
									icon={StarFreeIcons}
									className={`w-8 h-8 ${
										star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-text/30'
									} transition-colors`}
								/>
							</button>
						))}
					</div>
				</div>

				{/* Review */}
				<div>
					<label htmlFor="review-text" className="block text-sm font-medium text-text mb-2">
						Your Review
					</label>
					<textarea
						id="review-text"
						value={formData.review}
						onChange={(e) => setFormData({ ...formData, review: e.target.value })}
						placeholder="Tell us about your experience with our cleaning services..."
						required
						rows={5}
						className="w-full px-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm transition-all resize-none"
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full inline-flex items-center justify-center gap-2 rounded-xl text-white transition-all hover:scale-105 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed p-3 px-8 font-semibold"
				>
					{isSubmitting ? 'Submitting...' : 'Submit Review'}
				</button>
			</form>
		</div>
	);
}
