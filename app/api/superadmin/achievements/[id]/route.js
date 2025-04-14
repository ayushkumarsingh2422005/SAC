import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Achievement from '@/models/Achievement';
import { auth } from '@/lib/auth';
import { deleteFileFromS3, uploadFileToS3 } from '@/lib/s3-upload';

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

        const id = params.id;
        const achievement = await Achievement.findById(id);

        if (!achievement) {
            return NextResponse.json(
                { error: 'Achievement not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(achievement);
    } catch (error) {
        console.error('Fetch achievement error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch achievement' },
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
                { error: 'Access denied. Only superadmins can update achievements.' },
                { status: 403 }
            );
        }

        const id = params.id;
        const formData = await req.formData();
        const files = formData.getAll('images');
        const deletedImages = JSON.parse(formData.get('deletedImages') || '[]');
        const updateData = {
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            date: formData.get('date'),
            team: formData.getAll('team'),
            highlights: formData.getAll('highlights'),
            isRecent: formData.get('isRecent') === 'true',
            link: {
                url: formData.get('linkUrl'),
                text: formData.get('linkText')
            },
            priority: parseInt(formData.get('priority')) || 0,
            status: formData.get('status') || 'active'
        };

        // Get existing achievement
        const existingAchievement = await Achievement.findById(id);
        if (!existingAchievement) {
            return NextResponse.json(
                { error: 'Achievement not found' },
                { status: 404 }
            );
        }

        // Handle deleted images
        if (deletedImages.length > 0) {
            for (const imageUrl of deletedImages) {
                const key = imageUrl.split('/').pop();
                await deleteFileFromS3(key, process.env.AWS_BUCKET_NAME);
            }
            updateData.images = existingAchievement.images.filter(image => !deletedImages.includes(image.url));
        } else {
            updateData.images = existingAchievement.images;
        }

        // Handle new image uploads
        for (const file of files) {
            if (file.size > 0) {
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

                // Add new image information to updateData
                updateData.images.push({
                    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadResult.key}`,
                    caption: file.name
                });
            }
        }

        // Update achievement
        const achievement = await Achievement.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        return NextResponse.json({
            message: 'Achievement updated successfully',
            achievement
        });
    } catch (error) {
        console.error('Update achievement error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update achievement' },
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
                { error: 'Access denied. Only superadmins can delete achievements.' },
                { status: 403 }
            );
        }

        const id = params.id;
        const achievement = await Achievement.findById(id);

        if (!achievement) {
            return NextResponse.json(
                { error: 'Achievement not found' },
                { status: 404 }
            );
        }

        // Delete all images from S3
        if (achievement.images && achievement.images.length > 0) {
            for (const image of achievement.images) {
                const key = image.url.split('/').pop();
                await deleteFileFromS3(key, process.env.AWS_BUCKET_NAME);
            }
        }

        // Delete achievement from database
        await Achievement.findByIdAndDelete(id);

        return NextResponse.json({
            message: 'Achievement deleted successfully'
        });
    } catch (error) {
        console.error('Delete achievement error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete achievement' },
            { status: error.message === 'Authentication required' ? 401 : 500 }
        );
    }
} 