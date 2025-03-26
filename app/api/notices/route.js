import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Notice from '@/models/Notice';
import { auth } from '@/lib/auth';

export async function GET(req) {
    try {
        await connectToDB();

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;

        // Build query
        const query = {
            isActive: true,
            expiresAt: { $gt: new Date() }
        };
        
        if (category && category !== 'all') {
            query.category = category.toLowerCase();
        }

        // Execute query with pagination
        const notices = await Notice.find(query)
            .sort({ priority: -1, createdAt: -1 })
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
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Fetch notices error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notices' },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectToDB();

        const { user } = await auth(req);
        if (!user || !['admin', 'superadmin'].includes(user.role)) {
            return NextResponse.json(
                { error: 'Access denied. Only admins can post notices.' },
                { status: 403 }
            );
        }

        const noticeData = await req.json();
        noticeData.postedBy = user._id;

        const notice = new Notice(noticeData);
        await notice.save();

        return NextResponse.json({
            message: 'Notice created successfully',
            notice
        }, { status: 201 });
    } catch (error) {
        console.error('Create notice error:', error);
        return NextResponse.json(
            { error: 'Failed to create notice' },
            { status: 500 }
        );
    }
} 