import { cookies } from 'next/headers';
import { adminDb } from '@/lib/db';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function generateSessionId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export async function createSession(userId: number): Promise<string> {
	const sessionId = generateSessionId();
	const expiresAt = Date.now() + SESSION_DURATION;

	// Store session in database
	await adminDb.createSession(sessionId, userId, expiresAt);

	// Set cookie
	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		expires: new Date(expiresAt),
		path: '/',
	});

	return sessionId;
}

export async function getSession(): Promise<{ userId: number } | null> {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

	if (!sessionId) {
		return null;
	}

	// Clean up expired sessions first (do this occasionally)
	await adminDb.cleanupExpiredSessions();

	const session = await adminDb.getSession(sessionId);
	if (!session) {
		return null;
	}

	// Check if session is expired
	if (Date.now() > session.expiresAt) {
		await adminDb.deleteSession(sessionId);
		cookieStore.delete(SESSION_COOKIE_NAME);
		return null;
	}

	return { userId: session.userId };
}

export async function destroySession(): Promise<void> {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

	if (sessionId) {
		await adminDb.deleteSession(sessionId);
	}

	cookieStore.delete(SESSION_COOKIE_NAME);
}
