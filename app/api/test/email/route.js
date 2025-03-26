import { NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/email';

export async function POST(req) {
    try {
        const { email } = await req.json();
        
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Environment check
        const envInfo = {
            nodeEnv: process.env.NODE_ENV,
            apiKeyPresent: !!process.env.BREVO_API_KEY,
            apiKeyLength: process.env.BREVO_API_KEY?.length || 0,
            senderEmail: process.env.EMAIL_FROM
        };
        
        console.log('Environment Configuration:', envInfo);

        // Send a test OTP
        const testOTP = '123456';
        // Force sandbox to false in production
        const useSandbox = process.env.NODE_ENV !== 'production';
        
        const result = await sendOTPEmail(email, testOTP, useSandbox);
        
        return NextResponse.json({
            message: 'Test email sent successfully',
            environmentInfo: envInfo,
            result,
            sandboxMode: useSandbox,
            productionMode: process.env.NODE_ENV === 'production'
        });
    } catch (error) {
        console.error('Test email detailed error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        return NextResponse.json(
            { 
                error: 'Failed to send test email',
                details: error.message,
                environmentInfo: {
                    nodeEnv: process.env.NODE_ENV,
                    apiKeyPresent: !!process.env.BREVO_API_KEY,
                    apiKeyLength: process.env.BREVO_API_KEY?.length || 0,
                    senderEmail: process.env.EMAIL_FROM
                }
            },
            { status: 500 }
        );
    }
} 