import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["student", "admin", "superadmin"],
        default: "student"
    },
    disabled: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    resetPasswordOTP: {
        type: String,
        default: null
    },
    resetPasswordOTPExpiry: {
        type: Date,
        default: null
    },
    resetPasswordAttempts: {
        type: Number,
        default: 0
    },
    lastResetPasswordAttempt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Generate auth token
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString(), role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

// Find user by credentials
userSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Invalid login credentials');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid login credentials');
    }
    
    if (user.disabled) {
        throw new Error('Account is disabled');
    }
    
    return user;
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    delete user.resetPasswordOTP;
    delete user.resetPasswordOTPExpiry;
    delete user.resetPasswordAttempts;
    delete user.lastResetPasswordAttempt;
    return user;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
