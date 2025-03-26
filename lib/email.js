const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export const sendOTPEmail = async (email, otp, useSandbox = false) => {
    // Log configuration
    console.log('Email Configuration:', {
        apiKeyPresent: !!process.env.BREVO_API_KEY,
        apiKeyLength: process.env.BREVO_API_KEY?.length,
        senderEmail: process.env.EMAIL_FROM,
        recipientEmail: email,
        useSandbox,
        nodeEnv: process.env.NODE_ENV
    });

    const msg = {
        sender: {
            name: "Password Reset",
            email: process.env.EMAIL_FROM
        },
        to: [{
            email: email
        }],
        subject: 'Password Reset OTP',
        htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
                <div style="background-color: #f4f4f4; padding: 15px; text-align: center; margin: 20px 0;">
                    <h1 style="color: #0066cc; margin: 0; letter-spacing: 5px;">${otp}</h1>
                </div>
                <p>This OTP will expire in 15 minutes.</p>
                <p>If you didn't request this password reset, please ignore this email.</p>
                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                    This is an automated email, please do not reply.
                </p>
            </div>
        `
    };

    const headers = {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
    };

    // Only add sandbox header if explicitly enabled and not in production
    if (useSandbox && process.env.NODE_ENV !== 'production') {
        headers['X-Sib-Sandbox'] = 'drop';
        console.log('Running in sandbox mode - email will not be delivered');
    } else {
        console.log('Running in production mode - email will be delivered');
    }

    try {
        console.log('Sending email request to Brevo...');
        const response = await fetch(BREVO_API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(msg)
        });

        const responseData = await response.json();
        console.log('Brevo API Response:', {
            status: response.status,
            statusText: response.statusText,
            data: responseData
        });

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to send OTP email');
        }

        return responseData;
    } catch (error) {
        console.error('Detailed email sending error:', {
            error: error.message,
            stack: error.stack,
            name: error.name
        });
        throw new Error(`Failed to send OTP email: ${error.message}`);
    }
}; 