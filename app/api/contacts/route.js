import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET() {
    try {
        await connectToDB();

        // Get all active contacts and sort by order
        const contacts = await Contact.find({ isActive: true })
            .sort({ order: 1, createdAt: -1 });

        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Fetch contacts error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
} 