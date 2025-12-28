'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { QuoteUpFreeIcons, StarFreeIcons, ArrowLeftFreeIcons, ArrowRightFreeIcons, LinkSquare02FreeIcons } from '@hugeicons/core-free-icons';
import { useI18n } from '@/lib/i18n/client';

interface Review {
	id: number;
	name: string;
	rating: number;
	review: string;
	created_at: string;
}

interface ReviewResponse {
	success: boolean;
	reviews: Review[];
}

async function fetchReviews(): Promise<Review[]> {
	const response = await fetch('/api/reviews');
	if (!response.ok) {
		throw new Error('Failed to fetch reviews');
	}
	const data: ReviewResponse = await response.json();
	return data.reviews;
}

export function TestimonialsSection() {
	const t = useI18n();
	const { data: reviews = [], isLoading, error } = useQuery({
		queryKey: ['reviews'],
		queryFn: fetchReviews,
	});

	const [currentIndex, setCurrentIndex] = useState(0);

	// Auto-advance carousel every 5 seconds
	useEffect(() => {
		if (reviews.length === 0) return;
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % reviews.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [reviews.length]);

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev + 1) % reviews.length);
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<section id="Testimonials" className="py-16 md:py-24">
			<div className="">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						{t('home.testimonials.title').split(' ').slice(0, 3).join(' ')}{' '}
						<span className="text-primary">
							{t('home.testimonials.title').split(' ').slice(3).join(' ')}
						</span>
					</h2>
					<p className="text-lg text-text/80 max-w-2xl mx-auto">
						{t('home.testimonials.subtitle')}
					</p>
				</div>

				{/* Testimonials Carousel */}
				{isLoading ? (
					<div className="bg-background-secondary rounded-2xl p-8 border border-secondary/20 animate-pulse">
						<div className="h-64 bg-secondary/20 rounded"></div>
					</div>
				) : error || reviews.length === 0 ? (
					<div className="text-center py-12 bg-background-secondary rounded-2xl border border-secondary/20">
						<p className="text-text/60">{t('home.testimonials.noReviews')}</p>
					</div>
				) : (
					<div className="relative max-w-4xl mx-auto">
						{/* Main Carousel Card */}
						<div className="bg-background-secondary rounded-3xl p-8 md:p-12 border border-secondary/20 relative overflow-hidden">
							{/* Quote Icon */}
							<div className="absolute top-8 left-8 opacity-10">
								<HugeiconsIcon icon={QuoteUpFreeIcons} className="w-24 h-24 text-primary" />
							</div>

							{/* Review Content */}
							<div className="relative z-10">
								{/* Rating */}
								<div className="flex justify-center gap-1 mb-6">
									{[...Array(reviews[currentIndex].rating)].map((_, i) => (
										<HugeiconsIcon key={i} icon={StarFreeIcons} className="w-6 h-6 text-primary fill-current" />
									))}
								</div>

								{/* Review Text */}
								<p className="text-text text-lg md:text-xl leading-relaxed text-center mb-8 italic">
									"{reviews[currentIndex].review}"
								</p>

								{/* Author */}
								<div className="flex items-center justify-center gap-4">
									<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
										<span className="text-primary font-bold text-xl">
											{reviews[currentIndex].name
												.split(' ')
												.map((n) => n[0])
												.join('')
												.toUpperCase()}
										</span>
									</div>
									<div className="text-left">
										<div className="font-semibold text-text text-lg">{reviews[currentIndex].name}</div>
										<div className="text-sm text-text/50">
											{new Date(reviews[currentIndex].created_at).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Navigation Arrows */}
						<button
							onClick={goToPrevious}
							className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg z-20"
							aria-label="Previous review"
						>
							<HugeiconsIcon icon={ArrowLeftFreeIcons} className="w-6 h-6" />
						</button>
						<button
							onClick={goToNext}
							className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg z-20"
							aria-label="Next review"
						>
							<HugeiconsIcon icon={ArrowRightFreeIcons} className="w-6 h-6" />
						</button>

						{/* Dots Indicator */}
						<div className="flex justify-center gap-2 mt-8">
							{reviews.map((_, index) => (
								<button
									key={index}
									onClick={() => goToSlide(index)}
									className={`w-3 h-3 rounded-full transition-all ${
										index === currentIndex ? 'bg-primary w-8' : 'bg-secondary/30 hover:bg-secondary/50'
									}`}
									aria-label={`Go to review ${index + 1}`}
								/>
							))}
						</div>
					</div>
				)}

				{/* Bottom CTA */}
				<div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					<div className="bg-black rounded-3xl p-8 md:p-12 text-center">
						<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
							{t('home.testimonials.ctaTitle').split(' ')[0]}{' '}
							{t('home.testimonials.ctaTitle').split(' ').slice(1, 3).join(' ')}{' '}
							<span className="text-primary">
								{t('home.testimonials.ctaTitle').split(' ').slice(3).join(' ')}
							</span>
						</h3>
						<p className="text-white/80 mb-6 max-w-xl mx-auto">{t('home.testimonials.ctaDescription')}</p>
						<a
							href="/contact"
							className="inline-flex items-center gap-2 rounded-xl text-sm text-black transition-all hover:scale-105 bg-primary hover:bg-primary/90 p-3 px-8 font-semibold"
						>
							{t('home.testimonials.getStarted')}
						</a>
					</div>

					<div className="flex justify-center">
						<div className="w-full max-w-md">
							<h3 className="text-xl font-bold text-text mb-4 text-center">
								{t('home.testimonials.leaveReview').split(' ')[0]}{' '}
								<span className="text-primary">
									{t('home.testimonials.leaveReview').split(' ').slice(1).join(' ')}
								</span>
							</h3>
							<div className="bg-background-secondary rounded-2xl p-6 border border-secondary/20">
								<a
									href="/contact#review"
									className="block w-full text-center inline-flex items-center justify-center gap-2 rounded-xl text-sm text-white transition-all hover:scale-105 bg-primary hover:bg-primary/90 p-3 px-8 font-semibold"
								>
									{t('home.testimonials.writeReview')}
								</a>
								<p className="text-xs text-text/60 text-center mt-3">{t('home.testimonials.writeReviewDescription')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
