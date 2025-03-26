import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/Users';

export async function POST(req) {
    try {
        await connectToDB();
        
        const userData = await req.json();
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Create new user
        const user = new User(userData);
        await user.save();
        
        // Generate token
        const token = await user.generateAuthToken();

        return NextResponse.json({
            user,
            token
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
} 