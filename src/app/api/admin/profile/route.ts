import { NextRequest, NextResponse } from 'next/server';
import { adminDb, verifyPassword } from '@/lib/db';
import { getSession } from '@/lib/admin/session';

// GET current admin profile
export async function GET() {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const admin = adminDb.getAdminById(session.userId);
		if (!admin) {
			return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
		}

		return NextResponse.json({ admin });
	} catch (error) {
		console.error('Get profile error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

// PUT update admin profile (username and/or password)
export async function PUT(request: NextRequest) {
	try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const admin = adminDb.getAdminById(session.userId);
		if (!admin) {
			return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
		}

		const body = await request.json();
		const { username, currentPassword, newPassword } = body;

		// If updating password, verify current password first
		if (newPassword) {
			if (!currentPassword) {
				return NextResponse.json(
					{ error: 'Current password is required to change password' },
					{ status: 400 }
				);
			}

			// Get admin with password hash
			const adminWithHash = adminDb.getAdminById(session.userId);
			if (!adminWithHash || !adminWithHash.password_hash) {
				return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
			}

			// Verify current password
			if (!verifyPassword(currentPassword, adminWithHash.password_hash)) {
				return NextResponse.json(
					{ error: 'Current password is incorrect' },
					{ status: 401 }
				);
			}

			// Update password
			adminDb.updateAdminPassword(session.userId, newPassword);
		}

		// Update username if provided
		if (username && username !== admin.username) {
			const success = adminDb.updateAdminUsername(session.userId, username);
			if (!success) {
				return NextResponse.json(
					{ error: 'Username already exists or update failed' },
					{ status: 400 }
				);
			}
		}

		// Get updated admin
		const updatedAdmin = adminDb.getAdminById(session.userId);

		return NextResponse.json({ admin: updatedAdmin });
	} catch (error) {
		console.error('Update profile error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
