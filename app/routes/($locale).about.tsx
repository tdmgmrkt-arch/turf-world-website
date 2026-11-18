/**
 * About Page
 *
 * Company information, mission, and values
 */
import {Link} from 'react-router';
import type {Route} from './+types/about';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'About Us | Turf World'},
    {
      name: 'description',
      content:
        'Learn about Turf World - your trusted wholesale artificial turf provider. Premium quality, industry-leading warranties, and exceptional customer service.',
    },
  ];
};

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Turf World</h1>
          <p>Your trusted partner in premium artificial turf solutions</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-text">
              <span className="section-label">Our Mission</span>
              <h2>Transforming Outdoor Spaces with Premium Turf</h2>
              <p>
                At Turf World, we're dedicated to providing the highest quality artificial turf
                products at wholesale prices. Our mission is to make premium, eco-friendly turf
                accessible to contractors, landscapers, and homeowners across the nation.
              </p>
              <p>
                We believe that every outdoor space deserves to look its best year-round, without
                the hassle and environmental impact of traditional grass maintenance. That's why we
                source only the finest C8 commercial-grade turf with industry-leading warranties.
              </p>
            </div>
            <div className="about-image">
              <img
                src="/turf-world-about.avif"
                alt="Turf World premium artificial turf installation"
                className="about-image-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="section-header">
            <span className="section-label">Our Values</span>
            <h2>What Sets Us Apart</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <QualityIcon />
              </div>
              <h3>Uncompromising Quality</h3>
              <p>
                Every product in our catalog meets rigorous quality standards. We use only C8
                commercial-grade yarn and UV-stabilized materials for lasting performance.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <WarrantyIcon />
              </div>
              <h3>Industry-Leading Warranties</h3>
              <p>
                We stand behind our products with warranties up to 16 years. Your investment is
                protected with comprehensive coverage against defects and UV degradation.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <EcoIcon />
              </div>
              <h3>Eco-Friendly Solutions</h3>
              <p>
                Our turf products are 100% lead-free and help conserve water. Choose sustainable
                landscaping without sacrificing beauty or durability.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <ShippingIcon />
              </div>
              <h3>Free Nationwide Shipping</h3>
              <p>
                We offer free freight shipping on all orders across the United States. Large orders
                ship via liftgate delivery right to your location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-grid about-grid-reverse">
            <div className="about-text">
              <span className="section-label">Why Choose Us</span>
              <h2>Your Success is Our Priority</h2>
              <p>
                Whether you're a contractor working on a large commercial project or a homeowner
                looking to transform your backyard, we provide the same level of dedication and
                service to every customer.
              </p>
              <ul className="about-list">
                <li>
                  <CheckIcon />
                  <span>Wholesale pricing on all products</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Expert guidance on product selection</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Free samples before you buy</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Fast processing and shipping</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Dedicated customer support</span>
                </li>
                <li>
                  <CheckIcon />
                  <span>Flexible roll sizes cut to your length</span>
                </li>
              </ul>
            </div>
            <div className="about-image">
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">27+</span>
                  <span className="stat-label">Premium Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">16</span>
                  <span className="stat-label">Year Warranty</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Lead-Free</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">FREE</span>
                  <span className="stat-label">Nationwide Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-container">
          <div className="about-cta-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Browse our selection of premium artificial turf or request free samples to see the
              quality for yourself.
            </p>
            <div className="about-cta-buttons">
              <Link to="/products" className="btn-primary">
                Shop All Products
              </Link>
              <Link to="/request-samples" className="btn-secondary">
                Request Free Samples
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Icons */
function QualityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function EcoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ShippingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
