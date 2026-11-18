/**
 * WarrantyQuality Component
 *
 * Highlights the 16-year warranty and C8 yarn quality.
 * Header-style cards with full-width colored banners.
 */
import {NavLink} from 'react-router';

export function WarrantyQuality() {
  return (
    <section className="warranty-quality-section" aria-labelledby="warranty-quality-title">
      <div className="wq-container">
        {/* Section Header */}
        <div className="wq-header">
          <span className="wq-label">What You're Getting</span>
          <h2 id="warranty-quality-title" className="wq-title">
            Industry-Leading Warranty & Quality
          </h2>
          <p className="wq-subtitle">
            We stand behind every product with the best warranty and materials in the business
          </p>
        </div>

        {/* Card Grid */}
        <div className="wq-grid">
          {/* Warranty Card */}
          <div className="wq-card">
            {/* Full-Width Header Banner */}
            <div className="wq-card-header wq-header-green">
              <span>16-YEAR WARRANTY</span>
            </div>

            {/* Card Body */}
            <div className="wq-card-body">
              {/* Centered Icon */}
              <div className="wq-card-icon">
                <WarrantyIcon />
              </div>

              {/* Card Content */}
              <h3 className="wq-card-title">Warranty</h3>
              <p className="wq-card-description">
                Since 2017, the synthetic turf industry has seen many changes. The most notable
                is the standard manufacturer warranty. If you're looking to purchase turf,
                <strong> the warranty usually tells all</strong>.
              </p>

              {/* Benefits List - Centered container, left-aligned text */}
              <div className="wq-benefits-wrapper">
                <ul className="wq-benefits-list">
                  <li>
                    <CheckIcon />
                    <span>Longest warranty in the industry</span>
                  </li>
                  <li>
                    <CheckIcon />
                    <span>Comprehensive coverage</span>
                  </li>
                  <li>
                    <CheckIcon />
                    <span>UV degradation protection</span>
                  </li>
                  <li>
                    <CheckIcon />
                    <span>Fiber & backing guarantee</span>
                  </li>
                </ul>
              </div>

              <NavLink to="/pages/warranty" className="wq-card-link">
                View Warranty Details
                <ArrowIcon />
              </NavLink>
            </div>
          </div>

          {/* Quality Card */}
          <div className="wq-card">
            {/* Full-Width Header Banner */}
            <div className="wq-card-header wq-header-gold">
              <span>C8 RESIN TECHNOLOGY</span>
            </div>

            {/* Card Body */}
            <div className="wq-card-body">
              {/* Centered Icon */}
              <div className="wq-card-icon">
                <QualityIcon />
              </div>

              {/* Card Content */}
              <h3 className="wq-card-title">Quality</h3>
              <p className="wq-card-description">
                When you purchase Turf World products, you know you're getting the
                <strong> highest quality</strong>. We construct our products with
                <strong> commercial grade C8 yarn</strong> for superior performance.
              </p>

              {/* Benefits List - Centered container, left-aligned text */}
              <div className="wq-benefits-wrapper">
                <ul className="wq-benefits-list">
                  <li>
                    <CheckIcon />
                    <span>Longer durability</span>
                  </li>
                  <li>
                    <CheckIcon />
                    <span>Softer, natural feel</span>
                  </li>
                  <li>
                    <CheckIcon />
                    <span>Vibrant, fade-resistant colors</span>
                  </li>
                  <li>
                    <CheckIcon />
                    <span>Commercial grade materials</span>
                  </li>
                </ul>
              </div>

              <NavLink to="/pages/c8-yarn-technology" className="wq-card-link">
                Learn About C8 Technology
                <ArrowIcon />
              </NavLink>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="wq-cta">
          <p className="wq-cta-text">
            <strong>Be sure to do your research before making a purchase.</strong>
            {' '}Compare our specs with any competitor.
          </p>
          <NavLink to="/request-samples" className="wq-cta-button">
            <SampleIcon />
            Order Free Samples to Compare
          </NavLink>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ICONS
   ============================================ */

function WarrantyIcon() {
  return (
    <svg className="wq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg className="wq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="wq-check" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="wq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function SampleIcon() {
  return (
    <svg className="wq-sample-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}
