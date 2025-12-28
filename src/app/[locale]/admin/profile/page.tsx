'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { HugeiconsIcon } from '@hugeicons/react';
import { User02FreeIcons, LockFreeIcons } from '@hugeicons/core-free-icons';

interface AdminUser {
	id: number;
	username: string;
}

interface ProfileResponse {
	admin: AdminUser;
}

interface UpdateProfileResponse {
	success: boolean;
	admin?: AdminUser;
	error?: string;
}

async function fetchProfile(): Promise<AdminUser> {
	const response = await fetch('/api/admin/profile');
	if (!response.ok) {
		if (response.status === 401) {
			throw new Error('UNAUTHORIZED');
		}
		throw new Error('Failed to fetch profile');
	}
	const data: ProfileResponse = await response.json();
	return data.admin;
}

async function updateProfile(data: {
	username: string;
	currentPassword: string;
	newPassword?: string;
}): Promise<UpdateProfileResponse> {
	const response = await fetch('/api/admin/profile', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	const result: UpdateProfileResponse = await response.json();
	if (!response.ok) {
		return { success: false, error: result.error || 'Failed to update profile' };
	}
	return { success: true, admin: result.admin };
}

export default function AdminProfilePage() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { data: admin, isLoading } = useQuery<AdminUser>({
		queryKey: ['admin-profile'],
		queryFn: fetchProfile,
		retry: false,
		throwOnError: (error) => {
			if (error instanceof Error && error.message === 'UNAUTHORIZED') {
				router.push('/admin/login');
				return false;
			}
			return true;
		},
	});

	const mutation = useMutation({
		mutationFn: updateProfile,
		onSuccess: () => {
			// Invalidate profile query to refetch
			queryClient.invalidateQueries({ queryKey: ['admin-profile'] });
		},
	});

	const form = useForm({
		defaultValues: {
			username: '',
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		onSubmit: async ({ value }) => {
			// Validate password fields
			if (value.newPassword || value.confirmPassword) {
				if (!value.currentPassword) {
					throw new Error('Current password is required to change password');
				}
				if (value.newPassword !== value.confirmPassword) {
					throw new Error('New passwords do not match');
				}
				if (value.newPassword.length < 6) {
					throw new Error('New password must be at least 6 characters long');
				}
			}

			const result = await mutation.mutateAsync({
				username: value.username,
				currentPassword: value.currentPassword,
				newPassword: value.newPassword || undefined,
			});

			if (!result.success) {
				throw new Error(result.error || 'Failed to update profile');
			}
		},
	});

	// Update form when admin data loads
	useEffect(() => {
		if (admin) {
			form.setFieldValue('username', admin.username);
		}
	}, [admin, form]);

	// Clear password fields on successful update
	useEffect(() => {
		if (mutation.data?.success) {
			form.setFieldValue('currentPassword', '');
			form.setFieldValue('newPassword', '');
			form.setFieldValue('confirmPassword', '');
		}
	}, [mutation.data, form]);

	if (isLoading) {
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
						<form
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit();
							}}
							className="space-y-6"
						>
							{(form.state.errors as any)?.confirmPassword && (
								<div
									className="rounded-xl p-4 text-sm bg"
									style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}
								>
									{(form.state.errors as any).confirmPassword}
								</div>
							)}

							{mutation.error && (
								<div
									className="rounded-xl p-4 text-sm bg"
									style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}
								>
									{mutation.error instanceof Error ? mutation.error.message : 'An error occurred'}
								</div>
							)}

							{mutation.data?.success && (
								<div className="rounded-xl p-4 text-sm text-success bg-success/10">
									Profile updated successfully!
								</div>
							)}

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
										<form.Field
											name="username"
											children={(field) => (
												<input
													id="username"
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Enter new username"
													className="w-full pl-10 pr-4 py-3 border-secondary/10 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
													disabled={mutation.isPending}
												/>
											)}
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
											{form.state.values.newPassword && <span className="text-red-500 ml-1">*</span>}
										</label>
										<div className="relative">
											<HugeiconsIcon
												icon={LockFreeIcons}
												className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
												style={{ color: 'var(--text)', opacity: 0.4 }}
											/>
											<form.Field
												name="currentPassword"
												children={(field) => (
													<input
														id="currentPassword"
														type="password"
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="Enter current password"
														className="w-full pl-10 pr-4 py-3 border-secondary/10 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
														disabled={mutation.isPending}
													/>
												)}
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
											<form.Field
												name="newPassword"
												children={(field) => (
													<input
														id="newPassword"
														type="password"
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="Enter new password (min. 6 characters)"
														className="w-full pl-10 pr-4 py-3 border-secondary/10 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
														disabled={mutation.isPending}
													/>
												)}
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
											<form.Field
												name="confirmPassword"
												children={(field) => (
													<input
														id="confirmPassword"
														type="password"
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="Confirm new password"
														className="w-full pl-10 pr-4 py-3 border-secondary/10 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
														disabled={mutation.isPending}
													/>
												)}
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Submit Button */}
							<div className="pt-6">
								<button
									type="submit"
									disabled={mutation.isPending}
									className="w-full hover:bg-primary/30 border inline-flex items-center justify-center gap-2 rounded-xl text-sm transition-all p-3 px-8 font-semibold disabled:opacity-50 disabled:cursor-not-allowed bg-primary/10 text-primary"
								>
									{mutation.isPending ? 'Saving...' : 'Save Changes'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
