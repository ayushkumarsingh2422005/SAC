import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
// import Event from '@/models/Event';
import Event from '@/models/Events';
import { auth } from '@/lib/auth';

// Get single event
export async function GET(request, { params }) {
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

        const { id } = params;
        const event = await Event.findById(id);

        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error('Fetch event error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch event' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
}

// Update event
export async function PUT(request, { params }) {
    try {
        await connectToDB();

        // Authenticate superadmin
        const { user } = await auth(request);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can update contacts.' },
                { status: 403 }
            );
        }

        const { id } = params;
        const updateData = await request.json();

        // Validate category if provided
        if (updateData.category) {
            const validTypes = ["pdf", "youtube", "image", "url", "canva"];
            if (!validTypes.includes(updateData.category)) {
                return NextResponse.json(
                    { error: 'Invalid category' },
                    { status: 400 }
                );
            }
        }

        const event = await Event.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Event updated successfully',
            event
        });
    } catch (error) {
        console.error('Update event error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update event' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
}

// Delete event
export async function DELETE(request, { params }) {
    try {
        await connectToDB();

        // Authenticate superadmin
        const { user } = await auth(request);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can delete contacts.' },
                { status: 403 }
            );
        }

        const { id } = params;
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Delete event error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete event' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
} 