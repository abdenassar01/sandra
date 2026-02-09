import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/db';
import { createSession } from '@/lib/admin/session';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { username, password } = body;

		if (!username || !password) {
			return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
		}

		// Verify admin credentials
		const admin = await adminDb.verifyAdmin(username, password);
		if (!admin) {
			return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
		}

		// Create session
		await createSession(admin.id!);

		return NextResponse.json({
			success: true,
			user: { id: admin.id, username: admin.username },
		});
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
