import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/Users';
import bcrypt from 'bcryptjs';

// Get single user
export async function GET(request, { params }) {
  try {
    await connectToDB();
    const user = await User.findById(params.id).select('-password -resetToken -resetTokenExpiry');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update user
export async function PUT(request, { params }) {
  try {
    await connectToDB();
    const { id } = await params;
    const updateData = await request.json();

    // Remove empty password from update data
    if (updateData.password === '') {
      delete updateData.password;
    }

    // Hash password if provided
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // Convert active string to boolean
    if (updateData.active !== undefined) {
      updateData.active = updateData.active === 'true';
    }

    // Prevent changing superadmin role if it's the last superadmin
    if (updateData.role && updateData.role !== 'superadmin') {
      const currentUser = await User.findById(id);
      if (currentUser.role === 'superadmin') {
        const superadminCount = await User.countDocuments({ role: 'superadmin' });
        if (superadminCount <= 1) {
          return NextResponse.json(
            { error: 'Cannot change role of the last superadmin' },
            { status: 400 }
          );
        }
      }
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select('-password -resetToken -resetTokenExpiry');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// Delete user
export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    // Check if user exists and get their role
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent deleting the last superadmin
    if (user.role === 'superadmin') {
      const superadminCount = await User.countDocuments({ role: 'superadmin' });
      if (superadminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last superadmin' },
          { status: 400 }
        );
      }
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 