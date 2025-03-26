import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Notice from '@/models/Notice';
import { auth } from '@/lib/auth';

export async function GET(req, { params }) {
    try {
        await connectToDB();

        // Authenticate superadmin
        const { user } = await auth(req);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can access this endpoint.' },
                { status: 403 }
            );
        }

        const { id } = params;
        const notice = await Notice.findById(id).populate('postedBy', 'name role');

        if (!notice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(notice);
    } catch (error) {
        console.error('Fetch notice error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch notice' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        await connectToDB();

        // Authenticate superadmin
        const { user } = await auth(req);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can update notices.' },
                { status: 403 }
            );
        }

        const { id } = params;
        const updateData = await req.json();

        // Validate if notice exists
        const existingNotice = await Notice.findById(id);
        if (!existingNotice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        // Validate expiry date if provided
        if (updateData.expiresAt) {
            const expiryDate = new Date(updateData.expiresAt);
            if (isNaN(expiryDate.getTime())) {
                return NextResponse.json(
                    { error: 'Invalid expiry date format' },
                    { status: 400 }
                );
            }

            if (expiryDate <= new Date()) {
                return NextResponse.json(
                    { error: 'Expiry date must be in the future' },
                    { status: 400 }
                );
            }
        }

        // Validate category if provided
        if (updateData.category) {
            const validCategories = ['cultural', 'sports', 'technical', 'club_activities', 'competitions', 'events'];
            if (!validCategories.includes(updateData.category)) {
                return NextResponse.json(
                    { error: 'Invalid category' },
                    { status: 400 }
                );
            }
        }

        // Validate priority if provided
        if (updateData.priority) {
            const validPriorities = ['low', 'medium', 'high', 'urgent'];
            if (!validPriorities.includes(updateData.priority)) {
                return NextResponse.json(
                    { error: 'Invalid priority level' },
                    { status: 400 }
                );
            }
        }

        // Update the notice
        const notice = await Notice.findByIdAndUpdate(
            id,
            { 
                ...updateData,
                updatedBy: user._id,
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        ).populate('postedBy', 'name role');

        return NextResponse.json({
            message: 'Notice updated successfully',
            notice
        });
    } catch (error) {
        console.error('Update notice error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update notice' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectToDB();

        // Authenticate superadmin
        const { user } = await auth(req);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can delete notices.' },
                { status: 403 }
            );
        }

        const { id } = params;
        const notice = await Notice.findByIdAndDelete(id);

        if (!notice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Notice deleted successfully'
        });
    } catch (error) {
        console.error('Delete notice error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete notice' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
} 