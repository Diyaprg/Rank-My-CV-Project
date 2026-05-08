import React, { useState, useRef } from "react";
import "./Analysis.css";
import { uploadResume } from "../../api/resumeApi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Analysis = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const reportRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a PDF or DOCX file first.");
      return;
    }

    setLoading(true);
    setReport(null);

    try {

      const data = await uploadResume(
        file,
        jobDescription
      );

      setReport({

        atsScore: data.score,

        alignment:
          data.score >= 75
            ? "Strong Alignment"
            : data.score >= 50
            ? "Moderate Alignment"
            : "Weak Alignment",

        alignmentNote:
          data.feedback,

        keywordsMatched:
          data.matchedKeywords?.length || 0,

        keywordsTotal:
          (data.matchedKeywords?.length || 0) +
          (data.missingKeywords?.length || 0),

        formattingDepth:
          "Moderate",

        formattingStatus:
          data.score >= 60
            ? "PASSED"
            : "NEEDS WORK",

        softSkillsImpact:
          data.score >= 75
            ? "High"
            : data.score >= 50
            ? "Medium"
            : "Low",

        criticalRedFlags:
          data.score < 75 ? 1 : 0,

        criticalFeedback: [

          {

            title:
              "Keyword Optimization",

            description:
              data.feedback,

            fix:
              data.missingKeywords.length > 0

                ? `Add keywords like: ${data.missingKeywords
                    .slice(0, 5)
                    .join(", ")}`

                : "Excellent keyword optimization"

          }

        ],

        missingKeywords:
          data.missingKeywords,

        aiFeedback:
          data.aiFeedback,

        missingSections:
          data.missingSections,

        contentStrength: [

          {
            label:
              "Contact Information",

            status:
              "Full Scannability"
          },

          {
            label:
              "Work Experience",

            status:
              data.score >= 60
                ? "Matches Requirements"
                : "Needs Work"
          },

          {
            label:
              "Skills",

            status:
              data.score >= 75
                ? "Matches Requirements"
                : "Needs Work"
          }

        ]

      });

      localStorage.setItem(

        "atsReport",

        JSON.stringify({

          score:
            data.score,

          feedback:
            data.feedback,

          missingKeywords:
            data.missingKeywords,

          matchedKeywords:
            data.matchedKeywords,

          aiFeedback:
            data.aiFeedback

        })

      );

    } catch (err) {

      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong";

      setError(errorMessage);

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const getScoreColor = (score) => {
    if (score >= 75) return "#6c3fc5";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const circumference = 2 * Math.PI * 45;

  return (
    <div className="analysis-page">

      {!report && !loading && (

        <div
          className="upload-section"
          id="upload-section"
        >

          <h1>Analysis Report</h1>

          <p>
            Upload your resume to get an ATS compatibility analysis.
          </p>

          <div className="upload-box">

            <div className="jd-section">

              <label className="jd-label">
                Paste the Job Description
              </label>

              <textarea
                className="jd-textarea"
                placeholder="Paste the job description here to get a tailored ATS analysis..."
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
                rows={6}
              />

            </div>

            <label className="upload-file-label">
              Upload Your Resume (PDF or DOCX)
            </label>

            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              id="resume-upload"
            />

            <label
              htmlFor="resume-upload"
              className="upload-label"
            >

              {file
                ? `📄 ${file.name}`
                : "📁 Click to upload PDF or DOCX"}

            </label>

            {error && (

              <p className="error-text">
                {error}
              </p>

            )}

            <button
              className="analyze-btn"
              onClick={handleAnalyze}
            >

              Submit

            </button>

          </div>

        </div>

      )}

      {loading && (

        <div className="loading-section">

          <div className="spinner"></div>

          <p>
            Analyzing your resume...
          </p>

        </div>

      )}

      {report && (

        <div
          className="report-section"
          ref={reportRef}
        >

          <h1>Analysis Report</h1>

          <p className="report-subtitle">

            Your resume was analyzed against industry-standard ATS benchmarks.

          </p>

          {/* Score Cards */}

          <div className="score-grid">

            {/* ATS Score Circle */}

            <div className="score-card main-score">

              <svg
                className="circle-svg"
                viewBox="0 0 100 100"
              >

                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={getScoreColor(report.atsScore)}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference *
                    (
                      1 -
                      report.atsScore / 100
                    )
                  }
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />

                <text
                  x="50"
                  y="46"
                  textAnchor="middle"
                  className="score-text"
                >

                  {report.atsScore}%

                </text>

                <text
                  x="50"
                  y="60"
                  textAnchor="middle"
                  className="score-label-svg"
                >

                  ATS SCORE

                </text>

              </svg>

              <p className="alignment-title">
                {report.alignment}
              </p>

              <p className="alignment-note">
                {report.alignmentNote}
              </p>

            </div>

            {/* Keywords */}

            <div className="score-card">

              <div className="card-icon">
                🔑
              </div>

              <p className="card-label">
                Keywords Matched
              </p>

              <p className="card-value">

                {report.keywordsMatched}/
                {report.keywordsTotal}

              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill blue"
                  style={{
                    width:
                      `${(
                        report.keywordsMatched /
                        report.keywordsTotal
                      ) * 100}%`
                  }}
                ></div>

              </div>

            </div>

            {/* Formatting */}

            <div className="score-card">

              <div className="card-icon">
                📋
              </div>

              <p className="card-label">
                Formatting Depth
              </p>

              <p className="card-value">
                {report.formattingDepth}
              </p>

              <span
                className={`badge ${
                  report.formattingStatus === "PASSED"
                    ? "badge-green"
                    : "badge-red"
                }`}
              >

                {report.formattingStatus}

              </span>

            </div>

            {/* Soft Skills */}

            <div className="score-card">

              <div className="card-icon">
                💡
              </div>

              <p className="card-label">
                Soft Skills Impact
              </p>

              <p className="card-value">
                {report.softSkillsImpact}
              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill orange"
                  style={{

                    width:

                      report.softSkillsImpact === "High"
                        ? "90%"
                        : report.softSkillsImpact === "Medium"
                        ? "55%"
                        : "25%"

                  }}
                ></div>

              </div>

            </div>

            {/* Red Flags */}

            <div className="score-card">

              <div className="card-icon">
                ⚠️
              </div>

              <p className="card-label">
                Critical Red Flags
              </p>

              <p className="card-value">
                {report.criticalRedFlags} Issues
              </p>

              {report.criticalRedFlags > 0 && (

                <span className="badge badge-red">
                  ACTION REQUIRED
                </span>

              )}

            </div>

          </div>

          {/* Bottom Section */}

          <div className="bottom-grid">

            {/* Critical Feedback */}

            <div className="feedback-section">

              <h2>
                Critical Feedback
              </h2>

              {report.criticalFeedback.map(
                (item, i) => (

                  <div
                    className="feedback-card"
                    key={i}
                  >

                    <div className="feedback-header">

                      <span className="feedback-icon">
                        ❌
                      </span>

                      <strong>
                        {item.title}
                      </strong>

                    </div>

                    <p className="feedback-desc">
                      {item.description}
                    </p>

                    {item.fix && (

                      <div className="fix-box">

                        <span className="fix-label">
                          EXAMPLE FIX
                        </span>

                        <p className="fix-text">
                          {item.fix}
                        </p>

                      </div>

                    )}

                  </div>

                )
              )}

            </div>

            {/* Missing Resume Sections */}

            {report.missingSections &&
            report.missingSections.length > 0 && (

              <div className="missing-sections-section">

                <h2>
                  Missing Resume Sections
                </h2>

                <div className="missing-sections-container">

                  {report.missingSections.map(
                    (section, i) => (

                      <div
                        className="missing-section-card"
                        key={i}
                      >

                        ⚠️ {section}

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* Content Strength */}

            <div className="strength-section">

              <h2>
                Content Strength
              </h2>

              <div className="strength-list">

                {report.contentStrength.map(
                  (item, i) => (

                    <div
                      className="strength-item"
                      key={i}
                    >

                      <span className="strength-check">
                        ✅
                      </span>

                      <span className="strength-label">
                        {item.label}
                      </span>

                      <span className="strength-status">
                        {item.status}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

          {/* Re-analyze button */}

          <div className="reanalyze">

            <button
              className="analyze-btn"
              onClick={() => {

                setReport(null);
                setFile(null);

              }}
            >

              Analyze Another Resume

            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Analysis;