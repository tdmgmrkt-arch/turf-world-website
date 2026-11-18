/**
 * Broker Program Page
 *
 * Wholesale and reseller program information for contractors and landscapers
 */
import {Link} from 'react-router';
import type {Route} from './+types/broker-program';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Broker Program | Turf World'},
    {
      name: 'description',
      content:
        'Join Turf World\'s broker program for exclusive wholesale pricing, bulk ordering, and dedicated support. Perfect for contractors, landscapers, and resellers.',
    },
  ];
};

export default function BrokerProgram() {
  return (
    <div className="broker-page">
      {/* Hero Section */}
      <section className="broker-hero">
        <div className="broker-hero-content">
          <span className="broker-hero-eyebrow">Wholesale Partner Program</span>
          <h1>Grow Your Business with Turf World</h1>
          <p>
            Join 5,000+ happy landscapers and contractors who trust Turf World for premium
            artificial turf at exclusive wholesale prices.
          </p>
          <Link to="/contact" className="broker-hero-cta">
            Apply for Wholesale Pricing
            <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="broker-values">
        <div className="broker-container">
          <div className="broker-values-grid">
            <div className="broker-value-card">
              <div className="broker-value-icon">
                <TransparencyIcon />
              </div>
              <h3>No Surprises</h3>
              <p>
                Our turf products are engineered for durability, performance, and aesthetics.
                With Turf World, you can be confident you're offering your customers the best
                while maintaining healthy profit margins. We provide exclusive wholesale pricing
                to contractors and resellers.
              </p>
            </div>

            <div className="broker-value-card">
              <div className="broker-value-icon">
                <SupplyIcon />
              </div>
              <h3>Bulk Turf Supply You Can Count On</h3>
              <p>
                We know your business depends on a reliable supply of materials. That's why we
                offer bulk ordering options and flexible supply arrangements to ensure you always
                have the turf you need, when you need it.
              </p>
            </div>

            <div className="broker-value-card">
              <div className="broker-value-icon">
                <CustomIcon />
              </div>
              <h3>Customized Solutions</h3>
              <p>
                Whether you're working on a commercial landscape, a residential project, or sports
                fields, we have the perfect turf solutions for every application. Our diverse range
                of products makes it easy to meet any client's needs.
              </p>
            </div>

            <div className="broker-value-card">
              <div className="broker-value-icon">
                <SupportIcon />
              </div>
              <h3>Long-Term Support</h3>
              <p>
                Need assistance with product selection or logistics? Our team of turf experts is
                here to help. We offer dedicated support to contractors and resellers, from choosing
                the right product to managing delivery schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="broker-process">
        <div className="broker-container">
          <div className="broker-section-header">
            <span className="broker-section-label">Getting Started</span>
            <h2>How Our Process Works</h2>
          </div>

          <div className="broker-steps">
            <div className="broker-step">
              <div className="broker-step-number">1</div>
              <div className="broker-step-content">
                <h3>Apply for Wholesale Pricing</h3>
                <p>
                  Fill out our quick form to apply for our exclusive reseller and contractor
                  pricing. Our team will verify your details and get in touch with the next steps.
                </p>
              </div>
            </div>

            <div className="broker-step-connector" />

            <div className="broker-step">
              <div className="broker-step-number">2</div>
              <div className="broker-step-content">
                <h3>Access Our Product Catalog</h3>
                <p>
                  Once approved, access Turf World's wholesale pricing, our product catalog, and
                  bulk order options to find the right turf for your clients quickly and easily.
                </p>
              </div>
            </div>

            <div className="broker-step-connector" />

            <div className="broker-step">
              <div className="broker-step-number">3</div>
              <div className="broker-step-content">
                <h3>Grow Your Business</h3>
                <p>
                  With Turf World's high-quality turf and exceptional customer service, you'll
                  have everything you need to grow your business and deliver superior results
                  for your clients.
                </p>
              </div>
            </div>
          </div>

          <div className="broker-process-cta">
            <Link to="/contact" className="btn-primary">
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="broker-testimonials">
        <div className="broker-container">
          <div className="broker-section-header">
            <span className="broker-section-label">Success Stories</span>
            <h2>Join 5,000+ Happy Landscapers!</h2>
          </div>

          <div className="broker-testimonials-grid">
            <div className="broker-testimonial">
              <div className="broker-testimonial-stars">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <h4>"Give them a try you won't be disappointed"</h4>
              <p>
                Switched over to Turf World after trying different turf distributors, and I can
                confidently say their turfs are top-notch. They offer a great range of materials
                with unbeatable quality. The product I received not only met but far exceeded my
                expectations. They also have turf options that stand up better in the sun compared
                to others. If you're looking for high-quality turf, I highly recommend giving them
                a try—you won't be disappointed.
              </p>
              <div className="broker-testimonial-author">
                <div className="broker-testimonial-avatar">JM</div>
                <div className="broker-testimonial-info">
                  <span className="broker-testimonial-name">James M.</span>
                  <span className="broker-testimonial-role">Landscape Contractor</span>
                </div>
              </div>
            </div>

            <div className="broker-testimonial">
              <div className="broker-testimonial-stars">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <h4>"Turf World is truly exceptional"</h4>
              <p>
                The service I received from Turf World was top-tier. Their team answered all my
                questions quickly and thoroughly. The communication was clear and prompt, ensuring
                all my concerns were addressed. Their turf quality is also incredible—it completely
                transformed my lawn into a lush, green oasis. Turf World goes above and beyond, and
                I would highly recommend them to anyone seeking exceptional products and service.
              </p>
              <div className="broker-testimonial-author">
                <div className="broker-testimonial-avatar">SR</div>
                <div className="broker-testimonial-info">
                  <span className="broker-testimonial-name">Sarah R.</span>
                  <span className="broker-testimonial-role">Business Owner</span>
                </div>
              </div>
            </div>

            <div className="broker-testimonial">
              <div className="broker-testimonial-stars">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <h4>"Highly recommend this"</h4>
              <p>
                Look no further—Turf World is the best in the game! My turf looks absolutely
                amazing! Their staff is friendly, knowledgeable, and professional. Fast and
                efficient service with competitive and affordable pricing. They answered all my
                questions quickly and patiently. The quality of the turf and their products are
                top-notch. I definitely recommend Turf World for all your artificial turf needs;
                you absolutely won't regret it!
              </p>
              <div className="broker-testimonial-author">
                <div className="broker-testimonial-avatar">MT</div>
                <div className="broker-testimonial-info">
                  <span className="broker-testimonial-name">Mike T.</span>
                  <span className="broker-testimonial-role">Landscaping Professional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="broker-solutions">
        <div className="broker-container">
          <div className="broker-solutions-content">
            <div className="broker-solutions-text">
              <span className="broker-section-label">Our Products</span>
              <h2>Premium Artificial Grass Solutions</h2>
              <p>
                Discover the transformation Turf World can bring to your outdoor spaces. Our
                premium, long-lasting turf solutions range from lush, maintenance-free lawns
                to custom-designed landscapes.
              </p>
              <p>
                Whether you're enhancing residential greenery, creating durable commercial
                landscapes, or installing pet-friendly and high-performance sports turf, Turf
                World has the perfect solution. Enjoy the beauty, durability, and functionality
                you need for any project.
              </p>
              <Link to="/products" className="broker-solutions-link">
                Browse Our Catalog
                <ArrowIcon />
              </Link>
            </div>
            <div className="broker-solutions-features">
              <div className="broker-solution-item">
                <ResidentialIcon />
                <span>Residential Lawns</span>
              </div>
              <div className="broker-solution-item">
                <CommercialIcon />
                <span>Commercial Landscapes</span>
              </div>
              <div className="broker-solution-item">
                <PetIcon />
                <span>Pet-Friendly Turf</span>
              </div>
              <div className="broker-solution-item">
                <SportsIcon />
                <span>Sports Fields</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="broker-expect">
        <div className="broker-container">
          <div className="broker-section-header">
            <span className="broker-section-label">Partner Benefits</span>
            <h2>What You Can Expect With Turf World</h2>
          </div>

          <div className="broker-expect-grid">
            <div className="broker-expect-item">
              <div className="broker-expect-icon">
                <CheckCircleIcon />
              </div>
              <div className="broker-expect-content">
                <h4>No Surprises</h4>
                <p>
                  We provide clear timelines and keep you informed throughout the entire process.
                </p>
              </div>
            </div>

            <div className="broker-expect-item">
              <div className="broker-expect-icon">
                <CheckCircleIcon />
              </div>
              <div className="broker-expect-content">
                <h4>Professional Installation</h4>
                <p>
                  Our skilled team will install your turf seamlessly, ensuring a natural, flawless finish.
                </p>
              </div>
            </div>

            <div className="broker-expect-item">
              <div className="broker-expect-icon">
                <CheckCircleIcon />
              </div>
              <div className="broker-expect-content">
                <h4>Customized Solutions</h4>
                <p>
                  Our experts will assess your outdoor space and recommend the best turf options
                  to suit your needs and vision.
                </p>
              </div>
            </div>

            <div className="broker-expect-item">
              <div className="broker-expect-icon">
                <CheckCircleIcon />
              </div>
              <div className="broker-expect-content">
                <h4>Long-Term Support</h4>
                <p>
                  We're here for you beyond installation, offering maintenance tips and support
                  to keep your lawn looking lush and beautiful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="broker-cta">
        <div className="broker-container">
          <div className="broker-cta-content">
            <h2>Ready to Partner with Turf World?</h2>
            <p>
              Apply today and get access to exclusive wholesale pricing, dedicated support,
              and premium turf products that will help grow your business.
            </p>
            <div className="broker-cta-buttons">
              <Link to="/contact" className="btn-primary">
                Apply Now
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
function ArrowIcon() {
  return (
    <svg className="icon-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function TransparencyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function SupplyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function CustomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ResidentialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function CommercialIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function PetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 10h.01M10 10h.01M12 14c1.5 0 3-1 3-2.5S13.5 9 12 9s-3 1-3 2.5 1.5 2.5 3 2.5zM8.5 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.5 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 21c-3 0-6-2-6-5 0-2 2-4 6-4s6 2 6 4c0 3-3 5-6 5z"
      />
    </svg>
  );
}

function SportsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
      />
    </svg>
  );
}
