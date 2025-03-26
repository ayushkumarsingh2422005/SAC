import jwt from 'jsonwebtoken';
import User from '../models/Users';

export const auth = async (req) => {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '') ||
            req.cookies?.get('superadmin_token')?.value;

        if (!token) {
            throw new Error('Authentication required');
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            console.error('JWT Verification Error:', jwtError);
            if (jwtError.name === 'JsonWebTokenError') {
                throw new Error('Invalid token');
            }
            if (jwtError.name === 'TokenExpiredError') {
                throw new Error('Token expired'); 
            }
            throw new Error('Token verification failed');
        }

        const user = await User.findOne({
            _id: decoded._id,
            disabled: false
        });

        if (!user) {
            throw new Error('Authentication required');
        }

        return {
            user,
            token
        };
    } catch (error) {
        console.error('Auth Error:', error);
        throw error;
    }
};

export const requireRole = (roles) => {
    return async (req) => {
        const { user } = await auth(req);

        if (!roles.includes(user.role)) {
            throw new Error('Access denied');
        }

        return user;
    };
}; 