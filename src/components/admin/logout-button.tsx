'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton({ locale }: { locale: string }) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch('/api/admin/logout', {
				method: 'POST',
			});

			if (response.ok) {
				// Redirect to home page after successful logout
				router.push(`/${locale}`);
			} else {
				console.error('Logout failed');
				setIsSubmitting(false);
			}
		} catch (error) {
			console.error('Logout error:', error);
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleLogout}>
			<button
				type="submit"
				disabled={isSubmitting}
				className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
				style={{ backgroundColor: 'var(--error)' }}
			>
				{isSubmitting ? 'Logging out...' : 'Logout'}
			</button>
		</form>
	);
}
