const { PythonShell } = require('python-shell');
const VideoReport = require('../models/VideoReport');

const uploadVideo = (req, res) => {
  const { analysisType } = req.body;

  // Execute Python script for deep fake detection
  const pythonOptions = {
    args: [req.file.path, analysisType],
  };

  PythonShell.run('deep_fake_detection.py', pythonOptions, async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Analysis failed.' });

    const analysisResult = JSON.parse(results[0]);

    // Store report in MongoDB
    const newReport = new VideoReport({
      videoUrl: req.file.path,
      report: analysisResult.report,
      probabilityScore: analysisResult.probabilityScore,
    });

    await newReport.save();

    res.status(200).json({ 
      success: true, 
      videoUrl: req.file.path, 
      report: analysisResult.report, 
      probabilityScore: analysisResult.probabilityScore,
    });
  });
};

module.exports = { uploadVideo };
