const mongoose = require('mongoose');

const VideoReportSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  report: {
    summary: String,
    inconsistencies: [String],
    technicalAnalysis: String,
  },
  probabilityScore: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VideoReport', VideoReportSchema);
