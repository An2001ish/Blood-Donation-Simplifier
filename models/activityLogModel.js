const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['login', 'logout', 'donation', 'request', 'profile_update', 'registration']
  },
  details: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userRole: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
});

// Index for faster queries
activityLogSchema.index({ timestamp: -1 });
activityLogSchema.index({ userId: 1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;