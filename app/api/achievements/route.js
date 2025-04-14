import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Achievement from '@/models/Achievement';
import { auth } from '@/lib/auth';

export async function GET(req) {
    try {
        await connectToDB();

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 9;
        const category = searchParams.get('category');
        const isRecent = searchParams.get('isRecent') === 'true';
        const status = searchParams.get('status') || 'active';

        // Build query
        const query = { status };
        
        if (category) {
            query.category = category;
        }
        
        if (isRecent) {
            query.isRecent = true;
        }

        // Execute query with pagination
        const achievements = await Achievement.find(query)
            .sort({ priority: -1, date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        // Get total count for pagination
        const total = await Achievement.countDocuments(query);

        return NextResponse.json({
            achievements,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Fetch achievements error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch achievements' },
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
                { error: 'Access denied. Only admins can post achievements.' },
                { status: 403 }
            );
        }

        const achievementData = await req.json();
        
        // Validate required fields
        const requiredFields = ['title', 'category', 'description', 'date'];
        const missingFields = requiredFields.filter(field => !achievementData[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Set default values
        achievementData.status = 'active';
        achievementData.priority = achievementData.priority || 0;
        achievementData.isRecent = achievementData.isRecent || false;

        const achievement = new Achievement(achievementData);
        await achievement.save();

        return NextResponse.json({
            message: 'Achievement created successfully',
            achievement
        }, { status: 201 });
    } catch (error) {
        console.error('Create achievement error:', error);
        return NextResponse.json(
            { error: 'Failed to create achievement' },
            { status: 500 }
        );
    }
}
