import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { auth } from '@/lib/auth';

// Get all contacts
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

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        // Build query
        const query = {};
        if (category) {
            query.category = category;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } },
                { department: { $regex: search, $options: 'i' } }
            ];
        }

        const contacts = await Contact.find(query).sort({ createdAt: -1 });

        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Fetch contacts error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch contacts' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
}

// Create new contact
export async function POST(request) {
    try {
        await connectToDB();

        // Authenticate superadmin
        const { user } = await auth(request);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can create contacts.' },
                { status: 403 }
            );
        }

        const contactData = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'position', 'department', 'email', 'phone', 'category'];
        const missingFields = requiredFields.filter(field => !contactData[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Validate category
        const validCategories = ['faculty', 'club_secretary', 'por_holder'];
        if (!validCategories.includes(contactData.category)) {
            return NextResponse.json(
                { error: 'Invalid category' },
                { status: 400 }
            );
        }

        const contact = new Contact(contactData);
        await contact.save();

        return NextResponse.json({
            message: 'Contact created successfully',
            contact
        }, { status: 201 });
    } catch (error) {
        console.error('Create contact error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create contact' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
} 