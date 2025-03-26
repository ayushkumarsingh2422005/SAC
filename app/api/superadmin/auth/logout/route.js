import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectToDB } from '@/lib/mongodb';

export async function POST(req) {
  try {
    await connectToDB();

    // Get user and token from auth middleware
    const { user, token } = await auth(req);

    // Remove the token from user's tokens array
    user.tokens = user.tokens.filter(t => t.token !== token);
    await user.save();

    // Remove the cookie
    const cookieStore = await cookies();
    await cookieStore.delete('superadmin_token');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Authentication required' ? 401 : 500 }
    );
  }
} 