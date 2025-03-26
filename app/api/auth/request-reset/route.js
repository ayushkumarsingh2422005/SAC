import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/Users';
import { sendOTPEmail } from '@/lib/email';

export async function POST(req) {
    try {
        await connectToDB();
        
        const { email } = await req.json();
        
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: 'No account found with this email' },
                { status: 404 }
            );
        }

        // Check if user has made too many attempts
        const now = new Date();
        if (user.lastResetPasswordAttempt) {
            const timeDiff = now - user.lastResetPasswordAttempt;
            const minutesDiff = Math.floor(timeDiff / 1000 / 60);
            
            if (user.resetPasswordAttempts >= 3 && minutesDiff < 60) {
                return NextResponse.json(
                    { error: 'Too many attempts. Please try again in an hour.' },
                    { status: 429 }
                );
            }
            
            // Reset attempts counter if more than an hour has passed
            if (minutesDiff >= 60) {
                user.resetPasswordAttempts = 0;
            }
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Set OTP and expiry (15 minutes)
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpiry = new Date(now.getTime() + 15 * 60000); // 15 minutes
        user.resetPasswordAttempts = (user.resetPasswordAttempts || 0) + 1;
        user.lastResetPasswordAttempt = now;
        
        await user.save();
        
        // Send OTP email with sandbox mode in development
        const useSandbox = process.env.NODE_ENV === 'development';
        await sendOTPEmail(email, otp, useSandbox);

        return NextResponse.json({
            message: 'Password reset OTP has been sent to your email'
        });
    } catch (error) {
        console.error('Password reset request error:', error);
        return NextResponse.json(
            { error: 'Failed to process password reset request' },
            { status: 500 }
        );
    }
} 