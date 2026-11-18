/**
 * WhyChooseUs Component
 *
 * Highlights Turf World's commitment to excellence and safety standards.
 * Addresses concerns about product quality and safety.
 */
import {NavLink} from 'react-router';

export function WhyChooseUs() {
  return (
    <section className="why-choose-us" aria-labelledby="why-choose-title">
      <div className="why-choose-container">
        <div className="why-choose-content">
          {/* Text Content */}
          <div className="why-choose-text">
            <h2 id="why-choose-title" className="why-choose-title">
              Why Choose Turf World?
            </h2>
            <p className="why-choose-description">
              Here at Turf World, we pride ourselves on excellence. All our manufacturers are
              hand selected, ensuring swift order fulfillment, while delivering exceptional
              quality every time.
            </p>
            <p className="why-choose-description">
              All Turf World products contain <strong>zero lead</strong>, <strong>zero heavy metals</strong> and/or
              any other harmful chemicals according to the latest safety standards.
            </p>

            {/* Safety Certifications */}
            <div className="why-choose-certifications">
              <div className="certification-badge">
                <CertifiedIcon />
                <span>DIN Certified</span>
              </div>
              <div className="certification-badge">
                <CertifiedIcon />
                <span>REACH Compliant</span>
              </div>
              <div className="certification-badge">
                <CertifiedIcon />
                <span>RoHS Compliant</span>
              </div>
            </div>

            <NavLink to="/pages/safety-certifications" className="why-choose-cta">
              Learn About Our Safety Standards
              <ArrowIcon />
            </NavLink>
          </div>

          {/* Visual Element */}
          <div className="why-choose-visual">
            <div className="why-choose-stats">
              <div className="stat-item">
                <span className="stat-number">0%</span>
                <span className="stat-label">Lead Content</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0%</span>
                <span className="stat-label">Heavy Metals</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Safe for Families</span>
              </div>
            </div>

            {/* Decorative grass texture */}
            <div className="why-choose-decoration">
              <LeafIcon />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ICONS
   ============================================ */

function CertifiedIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg className="w-32 h-32 opacity-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
    </svg>
  );
}
