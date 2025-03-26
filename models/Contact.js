import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['faculty', 'club_secretary', 'por_holder', 'committee_member'],
  },
  club: {
    type: String,
    required: function() {
      return this.category === 'club_secretary';
    },
  },
  department: {
    type: String,
    required: function() {
      return this.category === 'faculty';
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
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
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Create indexes for better query performance
contactSchema.index({ category: 1, active: 1 });
contactSchema.index({ club: 1, active: 1 });
contactSchema.index({ order: 1 });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact; 