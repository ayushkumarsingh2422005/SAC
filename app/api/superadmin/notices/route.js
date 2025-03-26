import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Notice from '@/models/Notice';
import { auth } from '@/lib/auth';

export async function GET(req) {
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

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        const priority = searchParams.get('priority');

        // Build query
        const query = {};
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (category) {
            query.category = category;
        }
        
        if (priority) {
            query.priority = priority;
        }

        // Execute query with pagination
        const notices = await Notice.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('postedBy', 'name role');

        // Get total count for pagination
        const total = await Notice.countDocuments(query);

        return NextResponse.json({
            notices,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Fetch notices error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch notices' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectToDB();

        // Authenticate superadmin
        const { user } = await auth(req);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can create notices.' },
                { status: 403 }
            );
        }
        console.log(user)

        const noticeData = await req.json();
        console.log(noticeData)

        // Validate required fields
        const requiredFields = ['title', 'content', 'category', 'priority', 'expiresAt'];
        const missingFields = requiredFields.filter(field => !noticeData[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Validate expiry date
        const expiryDate = new Date(noticeData.expiresAt);
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

        // Validate category
        const validCategories = ['cultural', 'sports', 'technical', 'club_activities', 'competitions', 'events'];
        if (!validCategories.includes(noticeData.category)) {
            return NextResponse.json(
                { error: 'Invalid category' },
                { status: 400 }
            );
        }

        // Validate priority
        const validPriorities = ['low', 'medium', 'high', 'urgent'];
        if (!validPriorities.includes(noticeData.priority)) {
            return NextResponse.json(
                { error: 'Invalid priority level' },
                { status: 400 }
            );
        }

        noticeData.postedBy = user._id;
        noticeData.isActive = noticeData.isActive ?? true; // Default to active if not specified

        // Create notice
        const notice = new Notice(noticeData);
        await notice.save();

        // Populate postedBy field
        await notice.populate('postedBy', 'name role');

        return NextResponse.json({
            message: 'Notice created successfully',
            notice
        }, { status: 201 });
    } catch (error) {
        console.error('Create notice error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create notice' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
} 