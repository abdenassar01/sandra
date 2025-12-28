'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { User02FreeIcons, LockFreeIcons } from '@hugeicons/core-free-icons';

interface AdminUser {
	id: number;
	username: string;
}

export default function AdminProfilePage() {
	const params = useParams();
	const locale = (params?.locale as string) || 'en';
	const [admin, setAdmin] = useState<AdminUser | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const [username, setUsername] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		fetchProfile();
	}, []);

	const fetchProfile = async () => {
		try {
			const response = await fetch('/api/admin/profile');
			if (response.ok) {
				const data = await response.json();
				setAdmin(data.admin);
				setUsername(data.admin.username);
			} else {
				if (response.status === 401) {
					window.location.href = `/${locale}/admin/login`;
				}
			}
		} catch (err) {
			setError('Failed to load profile');
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		setSaving(true);

		// Validate password fields
		if (newPassword || confirmPassword) {
			if (!currentPassword) {
				setError('Current password is required to change password');
				setSaving(false);
				return;
			}
			if (newPassword !== confirmPassword) {
				setError('New passwords do not match');
				setSaving(false);
				return;
			}
			if (newPassword.length < 6) {
				setError('New password must be at least 6 characters long');
				setSaving(false);
				return;
			}
		}

		try {
			const response = await fetch('/api/admin/profile', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username,
					currentPassword,
					newPassword: newPassword || undefined,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setAdmin(data.admin);
				setSuccess('Profile updated successfully!');
				// Clear password fields
				setCurrentPassword('');
				setNewPassword('');
				setConfirmPassword('');
			} else {
				setError(data.error || 'Failed to update profile');
			}
		} catch (err) {
			setError('An error occurred. Please try again.');
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="container py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="text-center">Loading...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container py-6 px-4 md:px-6">
			<div className="px-4 py-6 sm:px-0">
				<div className="mb-6">
					<h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
						Profile Settings
					</h1>
					<p className="mt-2 text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>
						Update your admin credentials
					</p>
				</div>

				<div className="max-w-2xl">
					<div className="rounded-2xl p-6 md:p-8 border bg-background-secondary border-primary/10">
						<form onSubmit={handleSubmit} className="space-y-6">
							{error && (
								<div className="rounded-xl p-4 text-sm text-error bg" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
									{error}
								</div>
							)}

							{success && <div className="rounded-xl p-4 text-sm text-success bg-success/10">{success}</div>}

							{/* Username Section */}
							<div>
								<h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
									Update Username
								</h3>
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
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											placeholder="Enter new username"
											className="w-full pl-10 pr-4 py-3 border-secondary/10 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
											disabled={saving}
										/>
									</div>
								</div>
							</div>

							{/* Password Section */}
							<div className="pt-6 border-t border-primary/10">
								<h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
									Update Password
								</h3>
								<div className="space-y-4">
									{/* Current Password */}
									<div>
										<label
											htmlFor="currentPassword"
											className="block text-sm font-medium mb-2"
											style={{ color: 'var(--text)' }}
										>
											Current Password
											{newPassword && <span className="text-red-500 ml-1">*</span>}
										</label>
										<div className="relative">
											<HugeiconsIcon
												icon={LockFreeIcons}
												className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
												style={{ color: 'var(--text)', opacity: 0.4 }}
											/>
											<input
												id="currentPassword"
												type="password"
												value={currentPassword}
												onChange={(e) => setCurrentPassword(e.target.value)}
												placeholder="Enter current password"
												className="w-full pl-10 pr-4 py-3 border-secondary/10 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
												disabled={saving}
											/>
										</div>
									</div>

									{/* New Password */}
									<div>
										<label htmlFor="newPassword" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
											New Password
										</label>
										<div className="relative">
											<HugeiconsIcon
												icon={LockFreeIcons}
												className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
												style={{ color: 'var(--text)', opacity: 0.4 }}
											/>
											<input
												id="newPassword"
												type="password"
												value={newPassword}
												onChange={(e) => setNewPassword(e.target.value)}
												placeholder="Enter new password (min. 6 characters)"
												className="w-full pl-10 pr-4 py-3 border-secondary/10 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
												disabled={saving}
											/>
										</div>
									</div>

									{/* Confirm Password */}
									<div>
										<label
											htmlFor="confirmPassword"
											className="block text-sm font-medium mb-2"
											style={{ color: 'var(--text)' }}
										>
											Confirm New Password
										</label>
										<div className="relative">
											<HugeiconsIcon
												icon={LockFreeIcons}
												className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
												style={{ color: 'var(--text)', opacity: 0.4 }}
											/>
											<input
												id="confirmPassword"
												type="password"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												placeholder="Confirm new password"
												className="w-full pl-10 pr-4 py-3 border-secondary/10 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
												disabled={saving}
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Submit Button */}
							<div className="pt-6">
								<button
									type="submit"
									disabled={saving}
									className="w-full hover:bg-primary/30 border inline-flex items-center justify-center gap-2 rounded-xl text-sm transition-all p-3 px-8 font-semibold disabled:opacity-50 disabled:cursor-not-allowed bg-primary/10 text-primary"
								>
									{saving ? 'Saving...' : 'Save Changes'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
