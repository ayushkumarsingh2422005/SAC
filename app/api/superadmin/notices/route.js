import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Notice from '@/models/Notice';
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

        const formData = await req.formData();
        const files = formData.getAll('files');
        const noticeData = {
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category'),
            priority: formData.get('priority'),
            expiresAt: formData.get('expiresAt'),
            isActive: formData.get('isActive') === 'true',
            postedBy: user._id,
            files: [] // Initialize empty files array
        };

        // Validate required fields
        const requiredFields = ['title', 'content', 'category', 'priority', 'expiresAt'];
        const missingFields = requiredFields.filter(field => !noticeData[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Handle file uploads
        for (const file of files) {
            if (file.size > 0) {
                const uploadResult = await uploadFileToS3("notices",file, process.env.AWS_BUCKET_NAME);
                
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

                // Add file information to noticeData
                noticeData.files.push({
                    name: uploadResult.name,
                    key: uploadResult.key,
                    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadResult.key}`,
                    size: uploadResult.size,
                    type: uploadResult.type
                });
            }
        }

        // Create notice with file information
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