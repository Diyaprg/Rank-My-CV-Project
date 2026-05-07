import React, { useEffect, useState } from "react";
import "./Suggestion.css";

const Suggestion = () => {

  const [report, setReport] = useState(null);

  const [selectedRole, setSelectedRole] =
    useState("Frontend Developer");

  useEffect(() => {

    const storedReport =
      localStorage.getItem("atsReport");

    if (storedReport) {
      setReport(JSON.parse(storedReport));
    }

  }, []);

  // Role-Based Suggestions
  const roleSuggestions = {

    "Frontend Developer": [
      "React.js",
      "JavaScript",
      "CSS",
      "Redux",
      "REST APIs",
      "Tailwind CSS"
    ],

    "Backend Developer": [
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
      "REST APIs",
      "System Design"
    ],

    "Data Analyst": [
      "Python",
      "SQL",
      "Power BI",
      "Excel",
      "Statistics",
      "Data Visualization"
    ],

    "Machine Learning Engineer": [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "Deep Learning",
      "MLOps",
      "Feature Engineering"
    ]

  };

  return (

    <div className="page-wrapper">

      {/* Header */}
      <header className="header-container">

        <h1>Master Your Next Move</h1>

        <p>
          Actionable, data-driven insights tailored
          to elevate your professional presence
          and land your dream role.
        </p>

      </header>

      {/* Top Cards */}
      <main className="suggestions-grid">

        {/* Resume Writing */}
        <section className="card resume-card">

          <div className="card-title">

            <div className="icon-circle">

              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >

                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>

                <polyline points="14 2 14 8 20 8"></polyline>

                <line x1="16" y1="13" x2="8" y2="13"></line>

                <line x1="16" y1="17" x2="8" y2="17"></line>

                <polyline points="10 9 9 9 8 9"></polyline>

              </svg>

            </div>

            <span>Resume Writing</span>

          </div>

          <div className="item-list">

            <div className="suggestion-item">

              <h3>The 6-Second Rule</h3>

              <p>
                Optimize layout for rapid scanning by
                leading with impact-heavy metrics.
              </p>

            </div>

            <div className="suggestion-item">

              <h3>Quantify Everything</h3>

              <p>
                Turn responsibilities into measurable
                achievements using percentages and data.
              </p>

            </div>

            <div className="suggestion-item">

              <h3>Keyword Alignment</h3>

              <p>
                Match resume keywords with industry
                language to improve ATS ranking.
              </p>

            </div>

          </div>

        </section>

        {/* Job Search */}
        <section className="card job-card">

          <div className="card-title">

            <div className="icon-circle">

              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >

                <circle
                  cx="11"
                  cy="11"
                  r="8"
                ></circle>

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                ></line>

              </svg>

            </div>

            <span>Job Search</span>

          </div>

          <div className="item-list">

            <div className="suggestion-item">

              <h3>Hidden Market Access</h3>

              <p>
                Access unlisted opportunities through
                networking and referrals.
              </p>

            </div>

            <div className="suggestion-item">

              <h3>LinkedIn Authority</h3>

              <p>
                Build a strong profile that attracts
                recruiters automatically.
              </p>

            </div>

            <div className="suggestion-item">

              <h3>Narrative Pitching</h3>

              <p>
                Tell compelling stories that connect
                your experience with company goals.
              </p>

            </div>

          </div>

        </section>

      </main>

      {/* ATS Insights */}
      {report && (

        <div className="ats-section">

          {/* Missing Keywords */}
          <div className="tips-card">

            <h2>Missing Keywords</h2>

            <div className="keywords-container">

              {report?.missingKeywords?.length > 0 ? (

                report.missingKeywords.map((word, i) => (

                  <span
                    key={i}
                    className="keyword-badge"
                  >
                    {word}
                  </span>

                ))

              ) : (

                <p>No major keywords missing 🎉</p>

              )}

            </div>

          </div>

          {/* Personalized Suggestions */}
          <div className="tips-card">

            <h2>Personalized Suggestions</h2>

            <ul className="tips-list">

              {report?.score < 60 && (
                <>
                  <li>Add more technical skills</li>
                  <li>Improve keyword optimization</li>
                  <li>Include stronger projects</li>
                  <li>Improve resume formatting</li>
                </>
              )}

              {report?.score >= 60 &&
                report?.score < 80 && (
                <>
                  <li>Resume is decent but can improve</li>
                  <li>Add measurable achievements</li>
                  <li>Improve project descriptions</li>
                  <li>Include more industry keywords</li>
                </>
              )}

              {report?.score >= 80 && (
                <>
                  <li>Your resume is ATS optimized</li>
                  <li>Focus on interview preparation</li>
                  <li>Start applying aggressively</li>
                  <li>Strengthen networking efforts</li>
                </>
              )}

            </ul>

          </div>
          {/* AI Insights */}
            <div className="tips-card">

               <h2>AI Resume Insights</h2>

                 <p className="ai-feedback">
                      {report?.aiFeedback}
                 </p>

            </div>

          {/* Recommended Skills */}
          <div className="tips-card">

            <h2>Recommended Skills to Learn</h2>

            <div className="keywords-container">

              {report?.missingKeywords
                ?.slice(0, 6)
                .map((skill, i) => (

                  <span
                    key={i}
                    className="keyword-badge"
                  >
                    {skill}
                  </span>

                ))}

            </div>

          </div>

          {/* Top Skills Detected */}
          <div className="tips-card">

            <h2>Top Skills Detected</h2>

            <div className="keywords-container">

              {report?.matchedKeywords?.length > 0 ? (

                report.matchedKeywords.map((skill, i) => (

                  <span
                    key={i}
                    className="skill-badge success"
                  >
                    ✔ {skill}
                  </span>

                ))

              ) : (

                <p>No strong skills detected</p>

              )}

            </div>

          </div>

          {/* Role-Based Suggestions */}
          <div className="tips-card">

            <h2>Role-Based Suggestions</h2>

            <select
              className="role-select"
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(e.target.value)
              }
            >

              {Object.keys(roleSuggestions).map(
                (role, i) => (

                  <option
                    key={i}
                    value={role}
                  >
                    {role}
                  </option>

                )
              )}

            </select>

            <div className="keywords-container">

              {roleSuggestions[selectedRole].map(
                (skill, i) => (

                  <span
                    key={i}
                    className="keyword-badge"
                  >
                    {skill}
                  </span>

                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>

  );
};

export default Suggestion;