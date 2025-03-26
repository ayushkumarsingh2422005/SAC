import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { auth } from '@/lib/auth';

export async function POST(req) {
    try {
        await connectToDB();
        
        const { user, token } = await auth(req);
        
        // Remove the current token
        user.tokens = user.tokens.filter(t => t.token !== token);
        await user.save();

        return NextResponse.json({ message: 'Logged out successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 401 }
        );
    }
} 