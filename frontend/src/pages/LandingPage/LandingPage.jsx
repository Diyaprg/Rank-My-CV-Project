import React, { useRef } from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <div className="app-wrapper">

        {/*Hero Section*/}
        <header className="hero">
          <div className="hero-text">
            <div className="hero-badge">
            <span className="badge-icon">⚡</span>
            <span>AI Powered Resume Analysis</span>
          </div>
            <h1>Optimize Your Resume for <span>ATS Success.</span></h1>
            <p>Beat the bots and land more interviews with our precise analysis. Get your ATS score in seconds.</p>

            <div className="hero-btns">
              <button className="btn-primary" onClick={() => navigate('/analysis')}>Upload and Scan</button>
              <button className="btn-secondary"
                className="btn-secondary"
                onClick={scrollToFeatures}>Explore</button>
            </div>
          </div>

          <div className="hero-img-container">
            <img src="/images/9846834.jpg" alt="App Dashboard" className="hero-img" />
          </div>
        </header>

        <section className="features" ref={featuresRef}>
          <h2>Three Steps to Perfection</h2>
          <p className="features-sub">Our intelligent engine parses your CV like a real hiring manager would.</p>
          <div className="feature-grid">

            <div className="feature-card" style={{ background: "#ffffff" }}>
              <div className="feature-card-img">
                <img src="/images/com_7_copy.jpg" alt="Upload Resume" />
              </div>
              <h3>Upload Resume</h3>
              <p>Securely drag and drop your PDF or DocX file for instant parsing.</p>
              <a onClick={() => navigate('/analysis')}>Learn more →</a>
            </div>

            <div className="feature-card" style={{ background: "#ffffff" }}>
              <div className="feature-card-img">
                <img src="/images/Wavy_Tech-26_Single-09.jpg" alt="ATS Score" />
              </div>
              <h3>ATS Score</h3>
              <p>Instant scoring based on 50+ critical metrics used by top companies.</p>
              <a onClick={() => navigate('/analysis')}>Learn more →</a>
            </div>

            <div className="feature-card" style={{ background: "#ffffff" }}>
              <div className="feature-card-img">
                <img src="/images/light_bulb.jpg" alt="Feedback Suggestions" />
              </div>
              <h3>Feedback Suggestions</h3>
              <p>Get personalized bullet-point suggestions to improve wording.</p>
              <a onClick={() => navigate('/career-tips')}>Learn more →</a>
            </div>
          </div>
        </section>

        <div className="cta-section">
          <div className="cta-container">
            <h2>Scan Your Resume</h2>
            <div className='div'>
              <p className='prep'>Optimize your resume, improve visibility, and increase your chances of landing interviews faster.</p>
            </div>
            <div className="cta-card">
              <h3>Ready to land your dream job?</h3>
              <p>Join thousands of professionals who have used RankMyCV to double <br />their callback rates.</p>
              <button className="white-btn" onClick={() => navigate('/analysis')}>Upload Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;