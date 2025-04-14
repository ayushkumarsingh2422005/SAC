import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  }
});

const linkSchema = new mongoose.Schema({
  url: {
    type: String
  },
  text: {
    type: String
  }
});

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technical', 'Cultural', 'Sports', 'Academic', 'Other']
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  images: [imageSchema],
  team: [{
    type: String,
    required: true
  }],
  highlights: [{
    type: String,
    required: true
  }],
  isRecent: {
    type: Boolean,
    default: false
  },
  link: linkSchema,
  priority: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
achievementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for formatted date
achievementSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Static method to get recent achievements
achievementSchema.statics.getRecentAchievements = async function(limit = 3) {
  return this.find({ isRecent: true, status: 'active' })
    .sort({ date: -1 })
    .limit(limit);
};

// Static method to get achievements by category
achievementSchema.statics.getByCategory = async function(category) {
  return this.find({ category, status: 'active' })
    .sort({ date: -1 });
};

// Static method to get achievement statistics
achievementSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    { $match: { status: 'active' } },
    {
      $group: {
        _id: null,
        totalAchievements: { $sum: 1 },
        awardsWon: { $sum: { $size: "$highlights" } },
        categories: { $addToSet: "$category" }
      }
    }
  ]);

  return stats[0] || {
    totalAchievements: 0,
    awardsWon: 0,
    categories: []
  };
};

const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);

export default Achievement; 