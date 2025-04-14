import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Achievement from '@/models/Achievement';
import { auth } from '@/lib/auth';
import { uploadFileToS3 } from '@/lib/s3-upload';

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
        const status = searchParams.get('status');

        // Build query
        const query = {};
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (category) {
            query.category = category;
        }
        
        if (status) {
            query.status = status;
        }

        // Execute query with pagination
        const achievements = await Achievement.find(query)
            .sort({ createdAt: -1 })
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

        // Authenticate superadmin
        const { user } = await auth(req);
        if (!user || user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can create achievements.' },
                { status: 403 }
            );
        }

        const formData = await req.formData();
        const files = formData.getAll('images');
        
        // Extract achievement data from form
        const achievementData = {
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            date: formData.get('date'),
            team: formData.get('team')?.split(/[\r\n]+/).filter(Boolean).map(item => item.trim()) || [],
            highlights: formData.get('highlights')?.split(/[\r\n]+/).filter(Boolean).map(item => item.trim()) || [],
            isRecent: formData.get('isRecent') === 'true',
            link: {
                url: formData.get('linkUrl'),
                text: formData.get('linkText')
            },
            priority: parseInt(formData.get('priority')) || 0,
            status: formData.get('status') || 'active',
            images: []
        };

        // Validate required fields
        const requiredFields = ['title', 'category', 'description', 'date'];
        const missingFields = requiredFields.filter(field => !achievementData[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Check for duplicate title and date
        const existingAchievement = await Achievement.findOne({ 
            title: achievementData.title,
            date: achievementData.date
        });

        if (existingAchievement) {
            return NextResponse.json(
                { error: 'An achievement with this title and date already exists' },
                { status: 400 }
            );
        }

        // Handle image uploads
        for (const file of files) {
            if (file.size > 0) {
                try {
                    const uploadResult = await uploadFileToS3("achievements", file, process.env.AWS_BUCKET_NAME);

                    // Upload the file to S3 using the signed URL
                    const uploadResponse = await fetch(uploadResult.signedUrl, {
                        method: 'PUT',
                        body: file,
                        headers: {
                            'Content-Type': file.type,
                        },
                    });

                    if (!uploadResponse.ok) {
                        throw new Error('Failed to upload file to S3');
                    }

                    // Add image information to achievementData
                    achievementData.images.push({
                        url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadResult.key}`,
                        caption: file.name
                    });
                } catch (error) {
                    console.error('Image upload error:', error);
                    return NextResponse.json(
                        { error: 'Failed to upload image' },
                        { status: 500 }
                    );
                }
            }
        }

        // Create achievement with image information
        const achievement = new Achievement(achievementData);
        await achievement.save();

        return NextResponse.json({
            message: 'Achievement created successfully',
            achievement
        }, { status: 201 });
    } catch (error) {
        console.error('Create achievement error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create achievement' },
            { status: 500 }
        );
    }
} 