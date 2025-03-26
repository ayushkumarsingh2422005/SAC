import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET(req) {
  try {
    const { user } = await auth(req);

    if (user.role !== 'superadmin') {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 403 }
      );
    }

    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { isAuthenticated: false },
      { status: 401 }
    );
  }
} 