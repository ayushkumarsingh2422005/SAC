import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/Users';

export async function POST(request) {
  try {
    await connectToDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find and validate user
    const user = await User.findByCredentials(email, password);
    
    if (user.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Access denied. Only superadmins can access this endpoint.' },
        { status: 403 }
      );
    }

    // Generate token using the model method
    const token = await user.generateAuthToken();

    // Set cookie
    const cookieStore = await cookies();
    await cookieStore.set('superadmin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message === 'Invalid login credentials' ? 401 : 500 }
    );
  }
} 