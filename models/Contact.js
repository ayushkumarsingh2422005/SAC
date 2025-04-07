import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    trim: true
  },
  department: {
    type: String,
    required: [true, "Department is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["faculty", "club_secretary", "por_holder"],
    default: "faculty"
  },
  image: {
    type: String,
    default: '/avatar.png',
  },
  order: {
    type: Number,
    default: 0,
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    instagram: String,
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true,
});

// Create indexes for better query performance
contactSchema.index({ category: 1, isActive: 1 });
contactSchema.index({ club: 1, isActive: 1 });
contactSchema.index({ order: 1 });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact; 