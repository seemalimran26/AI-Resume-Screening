const ResumeModel = require("../Models/resume");
const pdfParse = require("pdf-parse");
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
});

exports.addResume = async (req, res) => {
  try {
    const { job_desc, user } = req.body;

    // Check PDF
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume",
      });
    }

    // Check Job Description
    if (!job_desc || !job_desc.trim()) {
      return res.status(400).json({
        message: "Please enter a job description",
      });
    }

    // Check User
    if (!user) {
      return res.status(400).json({
        message: "User information not found. Please login again.",
      });
    }

    // Read PDF
    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer);

    // AI Prompt
    const prompt = `
You are a professional resume screening assistant.

Compare the following resume with the provided job description.

RESUME:
${pdfData.text}

JOB DESCRIPTION:
${job_desc}

Analyze how well the candidate matches the job.

Give:
1. Match Score from 0 to 100
2. Brief feedback explaining the match
3. Mention important strengths
4. Mention important missing skills if any

Return the answer exactly in this format:

Score: XX
Feedback: Your brief feedback here.
`;

    // Cohere Chat API
    const response = await cohere.chat({
      model: "command-a-03-2025",
      message: prompt,
    });

    const result = response.text;

    console.log("Cohere Result:", result);

    // Extract score
    const scoreMatch = result.match(/Score:\s*(\d+)/i);
    const score = scoreMatch ? scoreMatch[1] : "0";

    // Extract feedback
    const feedbackMatch = result.match(/Feedback:\s*([\s\S]*)/i);

    const feedback = feedbackMatch ? feedbackMatch[1].trim() : result;

    // Save analysis in MongoDB
    const newResume = new ResumeModel({
      user: user,
      resume_name: req.file.originalname,
      job_desc: job_desc,
      score: score,
      feedback: feedback,
    });

    await newResume.save();

    return res.status(200).json({
      message: "Your analysis is ready",
      data: newResume,
    });
  } catch (err) {
    console.log("Resume Error:", err);

    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};

// Get all resumes for a specific user
exports.getAllResumesForUser = async (req, res) => {
  try {
    const user = req.params.user;

    const resumes = await ResumeModel.find({
      user: user,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      data: resumes,
    });
  } catch (err) {
    console.error("Get User Resumes Error:", err);

    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};

// Get all resumes for admin
exports.getResumeForAdmin = async (req, res) => {
  try {
    const resumes = await ResumeModel.find()
      .populate("user")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      data: resumes,
    });
  } catch (err) {
    console.error("Get Admin Resumes Error:", err);

    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};
