import { redirect } from 'next/navigation';
import { getSession } from './session';
import { adminDb } from '@/lib/db';

export async function requireAuth() {
	const session = await getSession();
	if (!session) {
		redirect('/admin/login');
	}

	const admin = adminDb.getAdminById(session.userId);
	if (!admin) {
		redirect('/admin/login');
	}

	return { admin };
}

export async function getOptionalAuth() {
	const session = await getSession();
	if (!session) {
		return null;
	}

	const admin = adminDb.getAdminById(session.userId);
	if (!admin) {
		return null;
	}

	return { admin };
}
