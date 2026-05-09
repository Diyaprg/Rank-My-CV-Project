const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const Resume = require("../models/Resume");
const generateGeminiFeedback =
  require("../utils/geminiFeedback");

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({

  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function(req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  }

});

const upload = multer({ storage });

// Resume validation
const validateResume = (text) => {

  const lowerText = text.toLowerCase();

  // Email check
  const hasEmail =
    /\S+@\S+\.\S+/.test(text);

  // Phone number check
  const hasPhone =
    /\d{10}/.test(
      text.replace(/\D/g, "")
    );

  // Important resume sections
  const sections = [
    "education",
    "skills",
    "projects",
    "experience",
    "internship",
    "certifications"
  ];

  const missingSections = [];

  sections.forEach((section) => {

    if (!lowerText.includes(section)) {

      missingSections.push(section);

    }

  });

  // Resume validity
  const isValidResume =
    hasEmail && hasPhone;

  return {
    isValidResume,
    missingSections
  };

};

// ATS Score function
const calculateScore = (resume, jd) => {

  const cleanText = (text) => {

    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .filter(word => word.length > 2);

  };

  const resumeWords =
    [...new Set(cleanText(resume))];

  const jdWords =
    [...new Set(cleanText(jd))];

  let matchCount = 0;

  jdWords.forEach(word => {

    if (resumeWords.includes(word)) {

      matchCount++;

    }

  });

  return Math.round(
    (matchCount / jdWords.length) * 100
  );

};

// Matched keywords
const getMatchedKeywords = (
  resume,
  jd
) => {

  const cleanText = (text) => {

    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .filter(word => word.length > 2);

  };

  const resumeWords =
    [...new Set(cleanText(resume))];

  const jdWords =
    [...new Set(cleanText(jd))];

  return jdWords.filter(word =>
    resumeWords.includes(word)
  );

};

// Missing keywords
const getMissingKeywords = (
  resume,
  jd
) => {

  const cleanText = (text) => {

    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .filter(word => word.length > 2);

  };

  const resumeWords =
    [...new Set(cleanText(resume))];

  const jdWords =
    [...new Set(cleanText(jd))];

  return jdWords.filter(word =>
    !resumeWords.includes(word)
  );

};

// Upload route
router.post(
  "/upload",
  upload.single("resume"),

  async (req, res) => {

    try {

      const jobDescription =
        req.body.jd;

      if (!req.file) {

        return res.status(400).json({
          message:
            "No resume uploaded"
        });

      }

      const dataBuffer =
        fs.readFileSync(req.file.path);

      const data =
        await pdfParse(dataBuffer);

      const resumeText =
        data.text;

      // Resume validation
      const validation =
        validateResume(resumeText);

      // Reject invalid files
      if (!validation.isValidResume) {

        return res.status(400).json({

          message:
            "Uploaded file does not appear to be a valid resume."

        });

      }

      // ATS score
      const score =
        calculateScore(
          resumeText,
          jobDescription
        );

      // Database save
      await Resume.create({

        resumeText,
        jobDescription,
        score

      });

      // Basic feedback
      const generateFeedback =
        (score) => {

          if (score > 80)
            return "Strong resume match";

          if (score > 60)
            return "Good resume but needs improvement";

          return "Add more relevant keywords";

        };

      // Keyword analysis
      const missingKeywords =
        getMissingKeywords(
          resumeText,
          jobDescription
        );

      const matchedKeywords =
        getMatchedKeywords(
          resumeText,
          jobDescription
        );

      // AI Feedback
      const aiFeedback =
        await generateGeminiFeedback(

          score,
          missingKeywords,
          matchedKeywords

        );

      // Response
      res.json({

        message:
          "Resume processed successfully",

        score,

        feedback:
          generateFeedback(score),

        missingKeywords,

        matchedKeywords,

        missingSections:
          validation.missingSections,

        aiFeedback,

        totalKeywords:
          matchedKeywords.length +
          missingKeywords.length,

        

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          "Error processing resume"

      });

    }

});

module.exports = router;