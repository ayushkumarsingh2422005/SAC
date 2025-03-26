import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/Users';

export async function POST(req) {
    try {
        await connectToDB();
        
        const { email, password } = await req.json();
        
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();

        return NextResponse.json({
            user,
            token
        });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 401 }
        );
    }
} 