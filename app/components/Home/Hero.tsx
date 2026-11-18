/**
 * Hero Component - Premium Full-Width Background Hero
 *
 * Features:
 * - Full-width background image slideshow
 * - Auto-rotating images with smooth crossfade
 * - Overlay content with headline, subhead, CTAs
 * - LCP optimized with eager loading
 * - Mobile-responsive
 */
import {useState, useEffect} from 'react';
import {NavLink} from 'react-router';

/** Hero background images */
const HERO_IMAGES = [
  {
    src: '/hero1.webp',
    alt: 'Premium artificial turf installation - lush green lawn',
  },
  {
    src: '/hero2.webp',
    alt: 'Professional turf landscaping project',
  },
  {
    src: '/hero3.webp',
    alt: 'Beautiful synthetic grass backyard',
  },
  {
    src: '/hero4.webp',
    alt: 'High-quality artificial turf texture',
  },
];

/** Slideshow interval in milliseconds */
const SLIDE_INTERVAL = 5000;

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-fullwidth" aria-label="Welcome to Turf World">
      {/* Background Image Slideshow */}
      <div className="hero-slideshow">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`hero-slide ${index === currentSlide ? 'hero-slide-active' : ''}`}
            aria-hidden={index !== currentSlide}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="hero-slide-image"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </div>
        ))}

        {/* Gradient Overlay */}
        <div className="hero-overlay" />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-content-inner">
          {/* Eyebrow Text */}
          <span className="hero-eyebrow">Premium Wholesale Artificial Turf</span>

          {/* Aspirational Headline */}
          <h1 className="hero-headline">
            EXPERIENCE TURF
            <span className="hero-headline-accent">LIKE NEVER BEFORE</span>
          </h1>

          {/* Confident Subheadline */}
          <p className="hero-subheadline">
            We sell real artificial turf, not gorgeous pictures. Commercial-grade
            synthetic grass that transforms any space into a lush, vibrant oasis.
          </p>

          {/* CTA Buttons */}
          <div className="hero-ctas">
            <NavLink to="/request-samples" className="hero-cta-primary">
              <SampleIcon />
              Get Free Samples
            </NavLink>
            <NavLink to="/products" className="hero-cta-secondary">
              Shop All Products
              <ArrowIcon />
            </NavLink>
          </div>

          {/* Trust Badge Row - Authority Indicators */}
          <div className="hero-trust-badges">
            <div className="hero-badge-item">
              <WarrantyBadge />
              <span>16-Year Warranty</span>
            </div>
            <div className="hero-badge-item">
              <LeadFreeBadge />
              <span>100% Lead-Free</span>
            </div>
            <div className="hero-badge-item">
              <ShippingBadge />
              <span>Free Shipping</span>
            </div>
            <div className="hero-badge-item">
              <QualityBadge />
              <span>C8 Grade Yarn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${index === currentSlide ? 'hero-indicator-active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
}

/* ============================================
   ICONS
   ============================================ */

function SampleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function WarrantyBadge() {
  return (
    <svg className="badge-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeadFreeBadge() {
  return (
    <svg className="badge-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShippingBadge() {
  return (
    <svg className="badge-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QualityBadge() {
  return (
    <svg className="badge-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================
   EXPORTS
   ============================================ */

export {ProjectStarter} from './ProjectStarter';
