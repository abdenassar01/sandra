import { redirect } from 'next/navigation';
import { getSession } from './session';
import { adminDb } from '@/lib/db';

export async function requireAuth(locale?: string) {
	const session = await getSession();
	if (!session) {
		// Redirect to locale-based login or root
		redirect(locale ? `/${locale}/admin/login` : '/');
	}

	const admin = await adminDb.getAdminById(session.userId);
	if (!admin) {
		redirect(locale ? `/${locale}/admin/login` : '/');
	}

	return { admin };
}

export async function getOptionalAuth() {
	const session = await getSession();
	if (!session) {
		return null;
	}

	const admin = await adminDb.getAdminById(session.userId);
	if (!admin) {
		return null;
	}

	return { admin };
}
