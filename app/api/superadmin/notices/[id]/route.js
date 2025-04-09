import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Notice from '@/models/Notice';
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

        const id = params.id;
        const formData = await req.formData();
        const files = formData.getAll('files');
        const deletedFiles = JSON.parse(formData.get('deletedFiles') || '[]');
        const updateData = {
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category'),
            priority: formData.get('priority'),
            expiresAt: formData.get('expiresAt'),
            isActive: formData.get('isActive') === 'true'
        };

        // Get existing notice
        const existingNotice = await Notice.findById(id);
        if (!existingNotice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        // Handle deleted files
        if (deletedFiles.length > 0) {
            for (const fileKey of deletedFiles) {
                await deleteFileFromS3(fileKey, process.env.AWS_BUCKET_NAME);
            }
            updateData.files = existingNotice.files.filter(file => !deletedFiles.includes(file.key));
        } else {
            updateData.files = existingNotice.files;
        }

        // Handle new file uploads
        for (const file of files) {
            if (file.size > 0) {
                const uploadResult = await uploadFileToS3(file, process.env.AWS_BUCKET_NAME);
                
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

                // Add new file information to updateData
                updateData.files.push({
                    name: uploadResult.name,
                    key: uploadResult.key,
                    url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadResult.key}`,
                    size: uploadResult.size,
                    type: uploadResult.type
                });
            }
        }

        // Update notice
        const notice = await Notice.findByIdAndUpdate(
            id,
            updateData,
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

        const id = params.id;
        const notice = await Notice.findById(id);

        if (!notice) {
            return NextResponse.json(
                { error: 'Notice not found' },
                { status: 404 }
            );
        }

        // Delete all files from S3
        if (notice.files && notice.files.length > 0) {
            for (const file of notice.files) {
                await deleteFileFromS3(file.key, process.env.AWS_BUCKET_NAME);
            }
        }

        // Delete notice from database
        await Notice.findByIdAndDelete(id);

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