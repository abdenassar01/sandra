import { requireAuth } from '@/lib/admin/auth';
import { reviewsDb, faqDb } from '@/lib/db';
import Link from 'next/link';

export default async function AdminDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const { admin } = await requireAuth(locale);

	// Get stats
	const allReviews = reviewsDb.getAllReviews();
	const pendingReviews = allReviews.filter((r) => r.approved === 0);
	const approvedReviews = allReviews.filter((r) => r.approved === 1);
	const allFaqs = faqDb.getAllFAQs();

	return (
		<div className="">
			<div className="px-4 py-6 sm:px-0">
				<div className="mb-8">
					<h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
						Dashboard
					</h1>
					<p className="mt-2 text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>
						Welcome back, <span className="font-semibold">{admin.username}</span>!
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-8">
					<div
						className="rounded-2xl p-6 border border-primary/10"
						style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--secondary/20)' }}
					>
						<div className="flex items-center">
							<div className="flex-1">
								<p className="text-sm font-medium" style={{ color: 'var(--text)', opacity: 0.6 }}>
									Total Reviews
								</p>
								<p className="mt-2 text-3xl font-bold" style={{ color: 'var(--text)' }}>
									{allReviews.length}
								</p>
							</div>
						</div>
					</div>

					<div
						className="rounded-2xl p-6 border border-primary/10"
						style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--secondary/20)' }}
					>
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<p className="text-sm font-medium" style={{ color: 'var(--text)', opacity: 0.6 }}>
									Pending Reviews
								</p>
								<p className="mt-2 text-3xl font-bold" style={{ color: 'var(--primary)' }}>
									{pendingReviews.length}
								</p>
							</div>
							{pendingReviews.length > 0 && (
								<Link
									href={`/${locale}/admin/reviews`}
									className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold transition-all hover:scale-105"
									style={{ backgroundColor: 'var(--primary)', color: 'white' }}
								>
									Review
								</Link>
							)}
						</div>
					</div>

					<div
						className="rounded-2xl p-6 border border-primary/10"
						style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--secondary/20)' }}
					>
						<div className="flex items-center">
							<div className="flex-1">
								<p className="text-sm font-medium" style={{ color: 'var(--text)', opacity: 0.6 }}>
									Total FAQs
								</p>
								<p className="mt-2 text-3xl font-bold" style={{ color: 'var(--text)' }}>
									{allFaqs.length}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Actions & Pending */}
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
					{/* Quick Actions */}
					<div
						className="rounded-2xl p-6 border border-primary/10"
						style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--secondary/20)' }}
					>
						<h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
							Quick Actions
						</h3>
						<div className="space-y-3">
							<Link
								href={`/${locale}/admin/reviews`}
								className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
								style={{ backgroundColor: 'var(--primary)', color: 'white' }}
							>
								Manage Reviews
							</Link>
							<Link
								href={`/${locale}/admin/faqs`}
								className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
								style={{ backgroundColor: 'var(--secondary)', color: 'white' }}
							>
								Manage FAQs
							</Link>
							<Link
								href={`/${locale}/admin/profile`}
								className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold border border-primary/10 transition-all hover:scale-105"
								style={{ borderColor: 'var(--secondary/20)', color: 'var(--text)' }}
							>
								Update Profile
							</Link>
						</div>
					</div>

					{/* Pending Reviews */}
					{pendingReviews.length > 0 && (
						<div
							className="rounded-2xl p-6 border border-primary/10"
							style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--secondary/20)' }}
						>
							<h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
								Pending Reviews
							</h3>
							<div className="space-y-3">
								{pendingReviews.slice(0, 3).map((review) => (
									<div
										key={review.id}
										className="flex items-center justify-between p-3 rounded-xl"
										style={{ backgroundColor: 'var(--background)' }}
									>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
												{review.name}
											</p>
											<p className="text-xs truncate" style={{ color: 'var(--text)', opacity: 0.6 }}>
												{review.review}
											</p>
										</div>
										<Link
											href={`/${locale}/admin/reviews`}
											className="ml-3 text-xs font-semibold transition-all hover:scale-105"
											style={{ color: 'var(--primary)' }}
										>
											View
										</Link>
									</div>
								))}
							</div>
							{pendingReviews.length > 3 && (
								<Link
									href={`/${locale}/admin/reviews`}
									className="mt-4 block text-sm font-semibold transition-all hover:scale-105"
									style={{ color: 'var(--primary)' }}
								>
									View all {pendingReviews.length} pending reviews →
								</Link>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
