import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { auth } from '@/lib/auth';

// Get single contact
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
        const contact = await Contact.findById(id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(contact);
    } catch (error) {
        console.error('Fetch contact error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch contact' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
}

// Update contact
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
            const validCategories = ['faculty', 'club_secretary', 'por_holder'];
            if (!validCategories.includes(updateData.category)) {
                return NextResponse.json(
                    { error: 'Invalid category' },
                    { status: 400 }
                );
            }
        }

        const contact = await Contact.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Contact updated successfully',
            contact
        });
    } catch (error) {
        console.error('Update contact error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update contact' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
}

// Delete contact
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
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return NextResponse.json(
                { error: 'Contact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Delete contact error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete contact' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
} 