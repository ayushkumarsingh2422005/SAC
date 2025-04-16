import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Event from '@/models/Events';

export async function GET() {
    try {
        await connectToDB();

        // Get all active events and sort by order
        const events = await Event.find()
            .sort({ order: 1, createdAt: -1 });

        return NextResponse.json(events);
    } catch (error) {
        console.error('Fetch events error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
} 