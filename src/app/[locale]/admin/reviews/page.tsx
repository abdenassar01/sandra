'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Review {
	id: number;
	name: string;
	email: string;
	rating: number;
	review: string;
	approved: number;
	created_at: string;
}

export default function AdminReviewsPage() {
	const params = useParams();
	const locale = (params?.locale as string) || 'en';
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

	useEffect(() => {
		fetchReviews();
	}, []);

	const fetchReviews = async () => {
		try {
			const response = await fetch('/api/admin/reviews');
			if (response.ok) {
				const data = await response.json();
				setReviews(data.reviews);
			} else {
				if (response.status === 401) {
					window.location.href = `/${locale}/admin/login`;
				}
			}
		} catch (error) {
			console.error('Failed to fetch reviews:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleApprove = async (id: number) => {
		try {
			const response = await fetch(`/api/admin/reviews/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ action: 'approve' }),
			});
			if (response.ok) {
				setReviews(reviews.map((r) => (r.id === id ? { ...r, approved: 1 } : r)));
			}
		} catch (error) {
			console.error('Failed to approve review:', error);
		}
	};

	const handleDelete = async (id: number) => {
		if (!confirm('Are you sure you want to delete this review?')) {
			return;
		}
		try {
			const response = await fetch(`/api/admin/reviews/${id}`, {
				method: 'DELETE',
			});
			if (response.ok) {
				setReviews(reviews.filter((r) => r.id !== id));
			}
		} catch (error) {
			console.error('Failed to delete review:', error);
		}
	};

	const filteredReviews = reviews.filter((review) => {
		if (filter === 'pending') return review.approved === 0;
		if (filter === 'approved') return review.approved === 1;
		return true;
	});

	const pendingCount = reviews.filter((r) => r.approved === 0).length;

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="text-center">Loading...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div className="px-4 py-6 sm:px-0">
				<div className="mb-6">
					<h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
						Manage Reviews
					</h1>
					<p className="mt-2 text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>
						{pendingCount > 0 && (
							<span
								className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
								style={{ backgroundColor: 'var(--warn)', color: 'white' }}
							>
								{pendingCount} pending approval
							</span>
						)}
					</p>
				</div>

				{/* Filters */}
				<div className="mb-6 flex flex-wrap gap-3">
					<button
						onClick={() => setFilter('all')}
						className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${
							filter === 'all' ? 'text-white' : ''
						}`}
						style={{
							backgroundColor: filter === 'all' ? 'var(--primary)' : 'var(--background-secondary)',
							color: filter === 'all' ? 'white' : 'var(--text)',
						}}
					>
						All ({reviews.length})
					</button>
					<button
						onClick={() => setFilter('pending')}
						className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${
							filter === 'pending' ? 'text-white' : ''
						}`}
						style={{
							backgroundColor: filter === 'pending' ? 'var(--warn)' : 'var(--background-secondary)',
							color: filter === 'pending' ? 'white' : 'var(--text)',
						}}
					>
						Pending ({pendingCount})
					</button>
					<button
						onClick={() => setFilter('approved')}
						className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${
							filter === 'approved' ? 'text-white' : ''
						}`}
						style={{
							backgroundColor: filter === 'approved' ? 'var(--success)' : 'var(--background-secondary)',
							color: filter === 'approved' ? 'var(--text)' : 'var(--text)',
						}}
					>
						Approved ({reviews.filter((r) => r.approved === 1).length})
					</button>
				</div>

				{/* Reviews List */}
				<div
					className="rounded-2xl border-primary/10 border overflow-hidden"
					style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--secondary/20)' }}
				>
					{filteredReviews.length === 0 ? (
						<div className="px-4 py-12 text-center" style={{ color: 'var(--text)', opacity: 0.6 }}>
							No reviews found.
						</div>
					) : (
						<div className="divide-y divide-primary/10">
							{filteredReviews.map((review) => (
								<div key={review.id} className="p-4 sm:px-6">
									<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 flex-wrap">
												<p className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
													{review.name}
												</p>
												<span
													className="px-2 py-0.5 rounded-full text-xs font-semibold"
													style={{ backgroundColor: 'var(--primary)', color: 'white' }}
												>
													{review.rating} / 5
												</span>
												{review.approved === 0 ? (
													<span
														className="px-2 py-0.5 rounded-full text-xs font-semibold"
														style={{ backgroundColor: 'var(--secondary/20)', color: 'var(--text)' }}
													>
														Pending
													</span>
												) : (
													<span
														className="px-2 py-0.5 rounded-full text-xs font-semibold"
														style={{ backgroundColor: 'var(--success)', color: 'white' }}
													>
														Approved
													</span>
												)}
											</div>
											<p className="mt-1 text-xs" style={{ color: 'var(--text)', opacity: 0.6 }}>
												{review.email}
											</p>
											<p className="mt-2 text-sm" style={{ color: 'var(--text)' }}>
												{review.review}
											</p>
											<p className="mt-1 text-xs" style={{ color: 'var(--text)', opacity: 0.4 }}>
												{new Date(review.created_at).toLocaleString()}
											</p>
										</div>
										<div className="flex gap-2 sm:self-center">
											{review.approved === 0 && (
												<button
													onClick={() => handleApprove(review.id)}
													className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
													style={{ backgroundColor: 'var(--success)', color: 'var(--text)' }}
												>
													Approve
												</button>
											)}
											<button
												onClick={() => handleDelete(review.id)}
												className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
												style={{ backgroundColor: 'var(--error)', color: 'white' }}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
