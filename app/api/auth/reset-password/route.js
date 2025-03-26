import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/Users';

export async function POST(req) {
    try {
        await connectToDB();
        
        const { email, otp, newPassword } = await req.json();
        
        if (!email || !otp || !newPassword) {
            return NextResponse.json(
                { error: 'Email, OTP, and new password are required' },
                { status: 400 }
            );
        }

        const user = await User.findOne({
            email,
            resetPasswordOTP: otp,
            resetPasswordOTPExpiry: { $gt: new Date() }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 400 }
            );
        }

        // Update password and clear reset fields
        user.password = newPassword;
        user.resetPasswordOTP = null;
        user.resetPasswordOTPExpiry = null;
        user.resetPasswordAttempts = 0;
        user.lastResetPasswordAttempt = null;
        
        // Clear all existing tokens to force re-login
        user.tokens = [];
        
        await user.save();

        return NextResponse.json({
            message: 'Password has been reset successfully'
        });
    } catch (error) {
        console.error('Password reset error:', error);
        return NextResponse.json(
            { error: 'Failed to reset password' },
            { status: 500 }
        );
    }
} 