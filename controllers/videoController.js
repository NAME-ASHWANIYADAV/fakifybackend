const axios = require('axios');
const VideoReport = require('../models/VideoReport');

const uploadVideo = async (req, res) => {
  const { analysisType } = req.body;

  console.log('Received request to upload video.');  // Log the start of the upload process
  console.log('Analysis type:', analysisType);  // Log the analysis type received

  let flaskUrl;
  if (analysisType === 'spatial') {
    flaskUrl = 'http://localhost:5000/spatial-analysis';
  } else if (analysisType === 'audio') {
    flaskUrl = 'http://localhost:5000/audio-analysis';
  } else {
    console.log('Invalid analysis type provided:', analysisType);  // Log invalid analysis type
    return res.status(400).json({ success: false, message: 'Invalid analysis type' });
  }

  try {
    if (!req.file) {
      console.log('No video file uploaded.');  // Log if no file is found
      return res.status(400).json({ success: false, message: 'No video file uploaded.' });
    }

    const videoPath = req.file.path;  // Path to the saved video
    console.log('Video uploaded successfully. File path:', videoPath);  // Log the file path

    // Fake response for testing purposes
    let analysisResult;
    if (analysisType === 'spatial') {
      analysisResult = {
        report: 'Fake spatial analysis summary: No deepfake detected with 95% confidence.',
        probabilityScore: 0.95,
      };
    } else if (analysisType === 'audio') {
      analysisResult = {
        report: 'Fake audio analysis summary: Possible deepfake detected with 60% confidence.',
        probabilityScore: 0.60,
      };
    }

    // Save the fake report in MongoDB
    const newReport = new VideoReport({
      videoUrl: videoPath,
      report: analysisResult.report,
      probabilityScore: analysisResult.probabilityScore,
    });

    await newReport.save();
    console.log('Report saved to database:', newReport);  // Log the saved report

    res.status(200).json({
      success: true,
      videoUrl: videoPath,
      report: analysisResult.report,
      probabilityScore: analysisResult.probabilityScore,
    });
  } catch (error) {
    console.error('Error in the analysis process:', error);  // Log any error that occurs
    res.status(500).json({ success: false, message: 'Analysis failed.' });
  }
};

module.exports = { uploadVideo };
