/**
 * TrustBadges Component
 *
 * Displays key value propositions as badges between Hero and content sections.
 * Reinforces trust signals immediately after the hero.
 */

export function TrustBadges() {
  return (
    <section className="trust-badges" aria-label="Why shop with us">
      <div className="trust-badges-container">
        <div className="trust-badges-grid">
          {/* C8 Grade Quality */}
          <div className="trust-badge">
            <div className="trust-badge-icon">
              <QualityIcon />
            </div>
            <div className="trust-badge-content">
              <h3 className="trust-badge-title">C8 Commercial Grade</h3>
              <p className="trust-badge-description">
                Premium yarn that lasts. No compromises, no shortcuts.
              </p>
            </div>
          </div>

          {/* 16-Year Warranty */}
          <div className="trust-badge">
            <div className="trust-badge-icon">
              <SatisfactionIcon />
            </div>
            <div className="trust-badge-content">
              <h3 className="trust-badge-title">16-Year Warranty</h3>
              <p className="trust-badge-description">
                Industry-leading coverage. We stand behind every roll.
              </p>
            </div>
          </div>

          {/* Pet Approved */}
          <div className="trust-badge">
            <div className="trust-badge-icon">
              <PetIcon />
            </div>
            <div className="trust-badge-content">
              <h3 className="trust-badge-title">100% Pet Safe</h3>
              <p className="trust-badge-description">
                Lead-free, antimicrobial, and built for heavy pet traffic.
              </p>
            </div>
          </div>

          {/* Wholesale Direct */}
          <div className="trust-badge">
            <div className="trust-badge-icon">
              <PriceIcon />
            </div>
            <div className="trust-badge-content">
              <h3 className="trust-badge-title">Wholesale Direct</h3>
              <p className="trust-badge-description">
                Factory-direct pricing. Skip the middleman, save thousands.
              </p>
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

function QualityIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}

function SatisfactionIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function PetIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 19c-1.5 0-2.5-.5-3.5-1.5S7 15.5 7 14c0-2 1.5-3 3-4s2-2.5 2-4c0 1.5.5 3 2 4s3 2 3 4c0 1.5-.5 2.5-1.5 3.5S13.5 19 12 19z"
      />
      <circle cx="8" cy="8" r="1.5" strokeWidth={1.5} />
      <circle cx="16" cy="8" r="1.5" strokeWidth={1.5} />
      <circle cx="5" cy="12" r="1.5" strokeWidth={1.5} />
      <circle cx="19" cy="12" r="1.5" strokeWidth={1.5} />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
