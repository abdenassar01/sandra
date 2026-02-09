import Link from 'next/link';
import { getOptionalAuth } from '@/lib/admin/auth';
import { LogoutButton } from '@/components/admin/logout-button';

export default async function AdminLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const auth = await getOptionalAuth();
	const { locale } = await params;

	return (
		<div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
			<nav
				className="rounded-xl border border-primary/10 bg-background-secondary"
				style={{ borderColor: 'var(--secondary/20)' }}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<div className="shrink-0 flex items-center">
								<Link href="/" className="text-xl font-bold">
									Sandra <span style={{ color: 'var(--primary)' }}>Cleaning</span>
								</Link>
								<span className="ml-4 text-sm" style={{ color: 'var(--text)', opacity: 0.6 }}>
									Admin Panel
								</span>
							</div>
							{auth && (
								<div className="ml-8 flex space-x-6">
									<Link
										href={`/${locale}/admin`}
										className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent transition-colors hover:opacity-80"
										style={{ color: 'var(--text)', opacity: 0.7 }}
									>
										Dashboard
									</Link>
									<Link
										href={`/${locale}/admin/reviews`}
										className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent transition-colors hover:opacity-80"
										style={{ color: 'var(--text)', opacity: 0.7 }}
									>
										Reviews
									</Link>
									<Link
										href={`/${locale}/admin/faqs`}
										className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent transition-colors hover:opacity-80"
										style={{ color: 'var(--text)', opacity: 0.7 }}
									>
										FAQs
									</Link>
									<Link
										href={`/${locale}/admin/profile`}
										className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent transition-colors hover:opacity-80"
										style={{ color: 'var(--text)', opacity: 0.7 }}
									>
										Profile
									</Link>
								</div>
							)}
						</div>
						{auth && (
							<div className="flex items-center">
								<LogoutButton locale={locale} />
							</div>
						)}
					</div>
				</div>
			</nav>
			<main>{children}</main>
		</div>
	);
}
