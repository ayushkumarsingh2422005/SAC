import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/Users';
import { auth } from '@/lib/auth';

export async function PUT(req) {
    try {
        await connectToDB();

        const authResult = await auth(req);
        
        console.log(authResult)
        if (!authResult?.user || authResult.user.role !== 'superadmin') {
            return NextResponse.json(
                { error: 'Access denied. Only superadmins can update roles.' },
                { status: 403 }
            );
        }
        const { userId, newRole } = await req.json();

        if (!userId || !newRole) {
            return NextResponse.json(
                { error: 'User ID and new role are required' },
                { status: 400 }
            );
        }

        // Validate role
        const validRoles = ['student', 'admin', 'superadmin'];
        if (!validRoles.includes(newRole)) {
            return NextResponse.json(
                { error: 'Invalid role. Must be one of: student, admin, superadmin' },
                { status: 400 }
            );
        }

        // Find and update user
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Prevent superadmin from changing their own role
        if (user._id.toString() === authResult.user._id.toString()) {
            return NextResponse.json(
                { error: 'Cannot change your own role' },
                { status: 400 }
            );
        }

        // Additional check: Only superadmin can create other superadmins
        if (newRole === 'superadmin') {
            if (authResult.user.role !== 'superadmin') {
                return NextResponse.json(
                    { error: 'Only superadmins can create other superadmins' },
                    { status: 403 }
                );
            }
        }

        // Update role
        user.role = newRole;
        await user.save();

        // Force logout user by clearing their tokens if role was changed
        if (user.role !== newRole) {
            user.tokens = [];
            await user.save();
        }

        return NextResponse.json({
            message: 'User role updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Update role error:', error);
        return NextResponse.json(
            { error: 'Failed to update user role' },
            { status: 500 }
        );
    }
} 