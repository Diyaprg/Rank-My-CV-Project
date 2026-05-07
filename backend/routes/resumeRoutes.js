const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const Resume = require("../models/Resume");
const generateGeminiFeedback =require("../utils/geminiFeedback");

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// ATS Score function
const calculateScore = (resume, jd) => {

    const cleanText = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .split(" ")
            .filter(word => word.length > 2);
    };

    const resumeWords = [...new Set(cleanText(resume))];
    const jdWords = [...new Set(cleanText(jd))];

    let matchCount = 0;

    jdWords.forEach(word => {
        if (resumeWords.includes(word)) {
            matchCount++;
        }
    });

    return Math.round((matchCount / jdWords.length) * 100);
};

const getMatchedKeywords = (resume, jd) => {

    const cleanText = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .split(" ")
            .filter(word => word.length > 2);
    };

    const resumeWords = [...new Set(cleanText(resume))];
    const jdWords = [...new Set(cleanText(jd))];

    return jdWords.filter(word => resumeWords.includes(word));
};

const getMissingKeywords = (resume, jd) => {

    const cleanText = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .split(" ")
            .filter(word => word.length > 2);
    };

    const resumeWords = [...new Set(cleanText(resume))];
    const jdWords = [...new Set(cleanText(jd))];

    return jdWords.filter(word => !resumeWords.includes(word));
};


// Single upload route
router.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        const jobDescription = req.body.jd;

        if (!req.file) {
            return res.status(400).json({ message: "No resume uploaded" });
        }

        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer);
        const resumeText = data.text;

        

        const score = calculateScore(resumeText, jobDescription);

        await Resume.create({ resumeText, jobDescription, score });

        const generateFeedback = (score) => {
            if (score > 80) return "Strong resume match";
            if (score > 60) return "Good resume but needs improvement";
            return "Add more relevant keywords";
        };
       

        const missingKeywords = getMissingKeywords(resumeText, jobDescription);
        const matchedKeywords = getMatchedKeywords(resumeText, jobDescription);
         const aiFeedback =await generateGeminiFeedback(
            score,
            missingKeywords,
            matchedKeywords
        );

        

        res.json({
            message: "Resume processed successfully",
            score,
            feedback: generateFeedback(score),
            missingKeywords,
            matchedKeywords,
            aiFeedback,
            totalKeywords: matchedKeywords.length + missingKeywords.length,
            resumeText,
            jobDescription
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing resume" });
    }
});

module.exports = router;