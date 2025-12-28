import { NextResponse } from 'next/server';
import { getSession } from '@/lib/admin/session';
import { adminDb } from '@/lib/db';

export async function GET() {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ authenticated: false }, { status: 401 });
		}

		const admin = adminDb.getAdminById(session.userId);
		if (!admin) {
			return NextResponse.json({ authenticated: false }, { status: 401 });
		}

		return NextResponse.json({
			authenticated: true,
			user: { id: admin.id, username: admin.username },
		});
	} catch (error) {
		console.error('Session check error:', error);
		return NextResponse.json({ authenticated: false }, { status: 500 });
	}
}
