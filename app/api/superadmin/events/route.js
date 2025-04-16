import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
// import Event from '@/models/Event';
import Event from '@/models/Events';
import { auth } from '@/lib/auth';

// Get all events
export async function GET(request) {
    try {
        await connectToDB();

        // Authenticate superadmin
        const { user } = await auth(request);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can access this endpoint.' },
                { status: 403 }
            );
        }
        const events = await Event.find()
            .sort({ order: 1, createdAt: -1 });

        return NextResponse.json(events);
    } catch (error) {
        console.error('Fetch events error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch events' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
}

// Create new event
export async function POST(request) {
    try {
        await connectToDB();

        // Authenticate superadmin
        const { user } = await auth(request);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can create events.' },
                { status: 403 }
            );
        }

        const eventData = await request.json();
        console.log(eventData);

        // Validate required fields
        const requiredFields = ['url', 'type', 'desc', 'order'];
        const missingFields = requiredFields.filter(field => field in requiredFields);

        // console.log(missingFields)
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Validate category
        const validType = ["pdf", "youtube", "image", "url", "canva"];
        if (!validType.includes(eventData.type)) {
            return NextResponse.json(
                { error: 'Invalid type' },
                { status: 400 }
            );
        }

        const event = new Event(eventData);
        console.log(event, eventData);
        await event.save();

        return NextResponse.json({
            message: 'Event created successfully',
            event
        }, { status: 201 });
    } catch (error) {
        console.error('Create event error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create event' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
} 