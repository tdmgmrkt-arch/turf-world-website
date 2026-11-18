/**
 * TrustSignals Component
 *
 * Displays trust badges and guarantees:
 * - Free shipping
 * - 16-year warranty
 * - C8 quality
 * - Safety certifications
 */

export function TrustSignals() {
  return (
    <div className="product-trust-signals">
      <div className="trust-signal">
        <ShippingIcon />
        <span>Free Shipping</span>
      </div>
      <div className="trust-signal">
        <WarrantyIcon />
        <span>16-Year Warranty</span>
      </div>
      <div className="trust-signal">
        <QualityIcon />
        <span>C8 Commercial Grade</span>
      </div>
      <div className="trust-signal">
        <SafetyIcon />
        <span>Lead-Free & Safe</span>
      </div>
    </div>
  );
}

export function TrustSignalsExpanded() {
  return (
    <div className="product-trust-expanded">
      <div className="trust-card">
        <div className="trust-card-icon">
          <ShippingIcon />
        </div>
        <div className="trust-card-content">
          <h4>Free Nationwide Shipping</h4>
          <p>Orders ship within 48 hours from 6 distribution centers</p>
        </div>
      </div>

      <div className="trust-card">
        <div className="trust-card-icon">
          <WarrantyIcon />
        </div>
        <div className="trust-card-content">
          <h4>16-Year Manufacturer Warranty</h4>
          <p>Industry-leading coverage on all turf products</p>
        </div>
      </div>

      <div className="trust-card">
        <div className="trust-card-icon">
          <QualityIcon />
        </div>
        <div className="trust-card-content">
          <h4>C8 Commercial Grade Yarn</h4>
          <p>Premium resin for durability and vibrant colors</p>
        </div>
      </div>

      <div className="trust-card">
        <div className="trust-card-icon">
          <SafetyIcon />
        </div>
        <div className="trust-card-content">
          <h4>100% Lead-Free & Pet Safe</h4>
          <p>IPEMA certified, meets ASTM safety standards</p>
        </div>
      </div>

      <div className="trust-card">
        <div className="trust-card-icon">
          <SecureIcon />
        </div>
        <div className="trust-card-content">
          <h4>Secure Checkout</h4>
          <p>256-bit SSL encryption protects your data</p>
        </div>
      </div>

      <div className="trust-card">
        <div className="trust-card-icon">
          <SupportIcon />
        </div>
        <div className="trust-card-content">
          <h4>Expert Support</h4>
          <p>Real humans ready to help with your project</p>
        </div>
      </div>
    </div>
  );
}

/* Icons */
function ShippingIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

function SafetyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function SecureIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
