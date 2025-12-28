'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { User02FreeIcons, LockFreeIcons } from '@hugeicons/core-free-icons';

export default function AdminLoginPage() {
	const router = useRouter();
	const params = useParams();
	const locale = (params?.locale as string) || 'en';
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch('/api/admin/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (response.ok) {
				router.push(`/${locale}/admin`);
				router.refresh();
			} else {
				setError(data.error || 'Login failed');
			}
		} catch {
			setError('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
			<main className="flex-1 flex items-center justify-center p-4">
				<div className="w-full max-w-md">
					<div className="bg-background-secondary rounded-2xl p-6 md:p-8 border border-secondary/20 shadow-lg">
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold mb-2">
								Admin <span style={{ color: 'var(--primary)' }}>Login</span>
							</h1>
							<p className="text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>
								Sign in to manage your site
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							{error && (
								<div className="rounded-xl p-4 text-sm" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
									{error}
								</div>
							)}

							{/* Username */}
							<div>
								<label htmlFor="username" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
									Username
								</label>
								<div className="relative">
									<HugeiconsIcon
										icon={User02FreeIcons}
										className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
										style={{ color: 'var(--text)', opacity: 0.4 }}
									/>
									<input
										id="username"
										type="text"
										required
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										placeholder="Enter your username"
										className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
										disabled={loading}
									/>
								</div>
							</div>

							{/* Password */}
							<div>
								<label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
									Password
								</label>
								<div className="relative">
									<HugeiconsIcon
										icon={LockFreeIcons}
										className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
										style={{ color: 'var(--text)', opacity: 0.4 }}
									/>
									<input
										id="password"
										type="password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter your password"
										className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all"
										disabled={loading}
									/>
								</div>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={loading}
								className="w-full rounded-xl text-sm text-white transition-all hover:scale-105 p-3 px-8 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
								style={{ backgroundColor: 'var(--primary)' }}
							>
								{loading ? 'Signing in...' : 'Sign In'}
							</button>

							{/* Default Credentials Note */}
							<div className="text-center pt-4 border-t border-secondary/20">
								<p className="text-xs" style={{ color: 'var(--text)', opacity: 0.6 }}>
									Default credentials: <span className="font-semibold">admin</span> /{' '}
									<span className="font-semibold">admin123</span>
								</p>
							</div>
						</form>
					</div>

					{/* Back to Home Link */}
					<div className="text-center mt-6">
						<Link href="/" className="text-sm hover:underline" style={{ color: 'var(--primary)' }}>
							← Back to website
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
