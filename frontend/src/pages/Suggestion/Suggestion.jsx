import React from 'react';
import './Suggestion.css';

const Suggestion = () => {
  return (
    <div className="page-wrapper">
      <header className="header-container">
        <h1>Master Your Next Move</h1>
        <p>
          Actionable, data-driven insights tailored to elevate your professional 
          presence and land your dream role.
        </p>
      </header>

      <main className="suggestions-grid">
        <section className="card resume-card">
          <div className="card-title">
            <div className="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <span>Resume Writing</span>
          </div>

          <div className="item-list">
            <div className="suggestion-item">
              <h3>The 6-Second Rule</h3>
              <p>Optimize layout for rapid scanning by leading with impact-heavy metrics.</p>
            </div>
            <div className="suggestion-item">
              <h3>Quantify Everything</h3>
              <p>Turn "Responsibilities" into "Achievements" using specific data and percentages.</p>
            </div>
            <div className="suggestion-item">
              <h3>Keyword Alignment</h3>
              <p>Mirror the language of your target industry to bypass ATS filters effortlessly.</p>
            </div>
          </div>
        </section>

        <section className="card job-card">
          <div className="card-title">
            <div className="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <span>Job Search</span>
          </div>

          <div className="item-list">
            <div className="suggestion-item">
              <h3>Hidden Market Access</h3>
              <p>Tap into the 80% of unposted roles through strategic networking and referrals.</p>
            </div>
            <div className="suggestion-item">
              <h3>LinkedIn Authority</h3>
              <p>Build a magnetic profile that works for you while you sleep.</p>
            </div>
            <div className="suggestion-item">
              <h3>Narrative Pitching</h3>
              <p>Don't just apply; tell a story that connects your past to their future.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Suggestion;