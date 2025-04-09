import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    category: {
        type: String,
        enum: ["general", "academic", "cultural", "technical", "sports"],
        default: "general"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "low"
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    files: [{
        name: {
            type: String,
            required: true
        },
        key: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }],
    expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 30*24*60*60*1000) // 30 days from now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
noticeSchema.index({ createdAt: -1 });
noticeSchema.index({ category: 1, createdAt: -1 });
noticeSchema.index({ isActive: 1, createdAt: -1 });

const Notice = mongoose.models.Notice || mongoose.model("Notice", noticeSchema);

export default Notice; 