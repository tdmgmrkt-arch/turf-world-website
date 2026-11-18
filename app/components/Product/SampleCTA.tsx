/**
 * SampleCTA Component
 *
 * Call-to-action for ordering free samples
 */
import {NavLink} from 'react-router';

export function SampleCTA() {
  return (
    <NavLink to="/request-samples" className="product-sample-cta">
      <SampleIcon />
      <span className="sample-cta-title">Order Free Samples</span>
    </NavLink>
  );
}

export function SampleCTACompact() {
  return (
    <NavLink to="/products/sample-kit" className="sample-cta-compact">
      <SampleIcon />
      <span>Order Free Samples</span>
    </NavLink>
  );
}

function SampleIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}
