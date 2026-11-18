/**
 * LogisticsMap Component
 *
 * Highlights 48-hour nationwide shipping and distribution network.
 * Addresses logistics anxiety with concrete delivery promises.
 */
import {NavLink} from 'react-router';

/** Distribution center locations */
const DISTRIBUTION_CENTERS = [
  {id: 'ca', name: 'California', city: 'Los Angeles, CA'},
  {id: 'tx', name: 'Texas', city: 'Dallas, TX'},
  {id: 'fl', name: 'Florida', city: 'Miami, FL'},
  {id: 'ga', name: 'Georgia', city: 'Atlanta, GA'},
  {id: 'nj', name: 'New Jersey', city: 'Newark, NJ'},
  {id: 'il', name: 'Illinois', city: 'Chicago, IL'},
];

export function LogisticsMap() {
  return (
    <section className="logistics-section" aria-labelledby="logistics-title">
      <div className="logistics-container">
        {/* Header */}
        <div className="logistics-header">
          <span className="logistics-label">When It Comes to Logistics</span>
          <h2 id="logistics-title" className="logistics-title">
            We Have You Covered!
          </h2>
        </div>

        {/* Main Content */}
        <div className="logistics-content">
          {/* Left - Info */}
          <div className="logistics-info">
            <div className="logistics-highlight">
              <div className="logistics-highlight-badge">
                <span className="logistics-badge-number">48</span>
                <span className="logistics-badge-unit">HR</span>
              </div>
              <div className="logistics-highlight-text">
                <h3>Nationwide Shipping</h3>
                <p>From order to doorstep in 48 hours or less</p>
              </div>
            </div>

            <p className="logistics-description">
              Our nationwide network lets you tap into huge distribution resources when
              the market is hungry and scale back when demand dips. Use the map to find
              a facility close to you.
            </p>

            <div className="logistics-features">
              <div className="logistics-feature">
                <TruckIcon />
                <div>
                  <strong>Freight-Ready</strong>
                  <span>Palletized for easy unloading</span>
                </div>
              </div>
              <div className="logistics-feature">
                <LocationIcon />
                <div>
                  <strong>6 Distribution Centers</strong>
                  <span>Strategic locations nationwide</span>
                </div>
              </div>
              <div className="logistics-feature">
                <SupportIcon />
                <div>
                  <strong>Dedicated Support</strong>
                  <span>Real-time tracking & updates</span>
                </div>
              </div>
            </div>

            <div className="logistics-cta">
              <p>If you have questions, the Turf World Team has answers.</p>
              <NavLink to="/pages/contact" className="logistics-contact-btn">
                <PhoneIcon />
                Contact Our Logistics Team
              </NavLink>
            </div>
          </div>

          {/* Right - Map Visualization */}
          <div className="logistics-map-container">
            {/* Simplified US Map SVG */}
            <div className="logistics-map">
              <USMapSVG />

              {/* Distribution Center Markers */}
              <div className="map-markers">
                {DISTRIBUTION_CENTERS.map((center) => (
                  <div
                    key={center.id}
                    className={`map-marker map-marker-${center.id}`}
                    title={center.city}
                  >
                    <span className="map-marker-dot" />
                    <span className="map-marker-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution Centers List */}
            <div className="logistics-centers">
              <h4>Distribution Centers</h4>
              <ul className="centers-list">
                {DISTRIBUTION_CENTERS.map((center) => (
                  <li key={center.id}>
                    <LocationPinIcon />
                    <span>{center.city}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   SVG MAP & ICONS
   ============================================ */

function USMapSVG() {
  return (
    <svg
      className="us-map-svg"
      viewBox="0 0 800 500"
      fill="currentColor"
      aria-label="United States map showing distribution centers"
    >
      {/* Continental US outline - Glowing blue on dark background */}
      <path
        className="us-map-path"
        d="M63,180 L68,165 L80,150 L95,140 L110,135 L125,130 L140,128 L155,125 L170,120 L185,115 L200,110
           L215,105 L230,100 L245,95 L260,90 L275,88 L290,85 L305,82 L320,80 L335,78 L350,77 L365,76 L380,75
           L395,74 L410,74 L425,75 L440,77 L455,80 L470,84 L485,89 L500,95 L515,102 L530,110 L545,115 L560,118
           L575,120 L590,123 L605,127 L620,132 L632,140 L640,150 L648,162 L655,175 L660,188 L663,202 L665,216
           L665,230 L663,244 L660,258 L655,270 L648,282 L640,292 L632,302 L622,312 L610,322 L596,332 L580,342
           L565,352 L550,362 L535,372 L520,380 L505,386 L490,390 L475,392 L460,392 L445,390 L430,386 L415,380
           L400,372 L385,362 L370,352 L358,345 L350,342 L342,345 L330,352 L315,362 L300,372 L285,380 L270,386
           L255,390 L240,392 L225,392 L210,390 L195,386 L180,380 L165,372 L150,362 L135,352 L120,342 L105,332
           L92,322 L82,312 L74,302 L68,292 L64,282 L62,270 L61,258 L61,244 L62,230 L63,216 L64,202 L63,180Z"
        fill="#2563EB"
        stroke="#60A5FA"
        strokeWidth="2"
      />
      {/* Florida peninsula */}
      <path
        className="us-map-path"
        d="M565,352 L575,360 L590,375 L605,395 L615,415 L620,435 L618,450 L610,460 L598,465 L585,462
           L575,455 L568,445 L565,430 L562,410 L558,390 L555,372 L555,360 L560,352 L565,352Z"
        fill="#2563EB"
        stroke="#60A5FA"
        strokeWidth="2"
      />
      {/* Texas bulge */}
      <path
        className="us-map-path"
        d="M330,352 L340,365 L345,380 L345,400 L340,420 L330,435 L315,445 L295,450 L275,448 L258,440
           L245,428 L238,415 L235,400 L238,385 L245,372 L255,362 L268,355 L285,352 L300,352 L315,355 L330,352Z"
        fill="#2563EB"
        stroke="#60A5FA"
        strokeWidth="2"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
