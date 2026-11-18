/**
 * Terms and Services Page
 *
 * Company policies, customer care info, and resources
 */
import {Link} from 'react-router';
import type {Route} from './+types/terms-and-services';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Terms & Services | Turf World'},
    {
      name: 'description',
      content:
        'Learn about Turf World policies, customer care, privacy & safety, wholesale inquiries, and payment methods.',
    },
  ];
};

export default function TermsAndServices() {
  return (
    <div className="terms-page">
      {/* Hero Section */}
      <section className="terms-hero">
        <div className="terms-hero-content">
          <h1>Terms & Services</h1>
          <p>Everything you need to know about shopping with Turf World.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="terms-main">
        <div className="terms-container">
          {/* Customer Care */}
          <div className="terms-section">
            <div className="terms-section-icon">
              <CustomerCareIcon />
            </div>
            <h2>Customer Care</h2>
            <p>
              At Turf World, your satisfaction is our top priority. Our dedicated customer care team
              is here to assist you with any questions, concerns, or support you may need—whether
              it's help choosing the right turf, tracking your order, or resolving an issue.
            </p>
            <p>
              We're committed to providing prompt, friendly, and knowledgeable service every step of
              the way. Reach out to us anytime—we're happy to help!
            </p>
            <div className="terms-contact-info">
              <a href="mailto:Support@turf-world.com" className="terms-link">
                <EmailIcon />
                Support@turf-world.com
              </a>
            </div>
          </div>

          {/* Privacy & Safety */}
          <div className="terms-section">
            <div className="terms-section-icon">
              <PrivacyIcon />
            </div>
            <h2>Privacy & Safety</h2>
            <p>
              Turf World is committed to protecting your personal information and ensuring a safe,
              secure shopping experience. We use industry-standard encryption and security protocols
              to safeguard your data during every transaction.
            </p>
            <p>
              We never sell or share your personal information with third parties for marketing
              purposes. Your privacy matters to us, and we handle your data with the utmost care and
              transparency.
            </p>
            <p>
              For more details, please review our full{' '}
              <Link to="/privacy-policy" className="terms-inline-link">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Wholesale Inquiries */}
          <div className="terms-section">
            <div className="terms-section-icon">
              <WholesaleIcon />
            </div>
            <h2>Wholesale Inquiries</h2>
            <p>
              Interested in purchasing turf in bulk? Turf World offers competitive wholesale pricing
              for contractors, landscapers, retailers, and large-scale projects. Whether you're
              outfitting a commercial space, managing multiple installations, or stocking inventory,
              we're here to help you get the best value.
            </p>
            <p>
              Contact our wholesale team today to discuss your needs, request a custom quote, or
              learn more about partnership opportunities.
            </p>
            <div className="terms-contact-info">
              <a href="mailto:Wholesale@turf-world.com" className="terms-link">
                <EmailIcon />
                Wholesale@turf-world.com
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="terms-section">
            <div className="terms-section-icon">
              <PaymentIcon />
            </div>
            <h2>Payment Methods</h2>
            <p>
              We accept a variety of secure payment options for your convenience. All transactions
              are encrypted and processed through trusted payment gateways.
            </p>
            <div className="payment-methods">
              <div className="payment-method">
                <CreditCardIcon />
                <span>Credit / Debit Cards</span>
                <small>Visa, Mastercard, American Express, Discover</small>
              </div>
              <div className="payment-method">
                <ShopPayIcon />
                <span>Shop Pay</span>
                <small>Fast, secure checkout</small>
              </div>
              <div className="payment-method">
                <PayPalIcon />
                <span>PayPal</span>
                <small>Pay with your PayPal account</small>
              </div>
              <div className="payment-method">
                <ApplePayIcon />
                <span>Apple Pay / Google Pay</span>
                <small>Quick mobile payments</small>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="terms-section">
            <div className="terms-section-icon">
              <ResourcesIcon />
            </div>
            <h2>Resources</h2>
            <p>
              Find helpful information, policies, and guides to make your turf shopping experience
              seamless.
            </p>
            <div className="resources-grid">
              <Link to="/shipping-policy" className="resource-card">
                <ShippingIcon />
                <span>Shipping Policy</span>
              </Link>
              <Link to="/return-policy" className="resource-card">
                <ReturnIcon />
                <span>Return Policy</span>
              </Link>
              <Link to="/faq" className="resource-card">
                <FAQIcon />
                <span>FAQ</span>
              </Link>
              <Link to="/contact" className="resource-card">
                <ContactIcon />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <footer className="terms-footer">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </footer>
        </div>
      </section>
    </div>
  );
}

/* Icons */
function CustomerCareIcon() {
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

function PrivacyIcon() {
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

function WholesaleIcon() {
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

function PaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}

function ResourcesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}

function ShopPayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
}

function PayPalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 3.72a.77.77 0 01.757-.64h6.693c2.204 0 3.818.645 4.8 1.919.455.59.751 1.255.88 1.977.135.756.103 1.66-.098 2.684-.066.342-.153.677-.256 1.001-.449 1.389-1.199 2.486-2.226 3.255-.994.745-2.269 1.152-3.791 1.204h-.79c-.59 0-1.1.414-1.195.985l-.044.26-.742 4.684-.036.18a.19.19 0 01-.189.158H7.076v-.001z" />
    </svg>
  );
}

function ApplePayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
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
        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
      />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
      />
    </svg>
  );
}

function FAQIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
