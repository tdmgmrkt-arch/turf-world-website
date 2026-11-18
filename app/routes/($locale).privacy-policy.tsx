/**
 * Privacy Policy Page
 */
import {Link} from 'react-router';
import type {Route} from './+types/privacy-policy';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Privacy Policy | Turf World'},
    {
      name: 'description',
      content:
        'Turf World Privacy Policy. Learn how we collect, use, and protect your personal information.',
    },
  ];
};

export default function PrivacyPolicy() {
  return (
    <div className="policy-page">
      {/* Hero Section */}
      <section className="policy-hero">
        <div className="policy-hero-content">
          <h1>Privacy Policy</h1>
          <p>How we collect, use, and protect your information.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="policy-main">
        <div className="policy-container">
          <div className="policy-content">
            {/* Introduction */}
            <div className="policy-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Turf-World.com. This Privacy Policy explains our practices concerning the
                personal information we collect from you or that you provide to us through our 10DLC
                services. Our use of this information is intended to enhance your experience with
                our services.
              </p>
            </div>

            {/* Information Collection */}
            <div className="policy-section">
              <h2>2. Information Collection</h2>
              <p>
                We collect personal information when you subscribe to our SMS notifications. This
                includes your mobile phone number and the content of your messages when you
                communicate with us.
              </p>
            </div>

            {/* Use of Information */}
            <div className="policy-section">
              <h2>3. Use of Information</h2>
              <p>
                The information we collect is primarily used to send you updates and promotional
                offers related to our products and services. We may also use this information for
                network improvement and customer support purposes.
              </p>
            </div>

            {/* Sharing of Information */}
            <div className="policy-section">
              <h2>4. Sharing of Information</h2>
              <p>
                We do not share your personal data with third parties, except in compliance with
                legal obligations or in case of a business transfer. Any third-party service
                providers used will be bound by confidentiality agreements to respect the security
                of your data.
              </p>
            </div>

            {/* Data Security */}
            <div className="policy-section">
              <h2>5. Data Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal
                information. These include encryption protocols and software safeguards.
              </p>
            </div>

            {/* User Rights */}
            <div className="policy-section">
              <h2>6. User Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. To
                exercise these rights, please get in touch with us directly using the information
                provided below.
              </p>
            </div>

            {/* Compliance */}
            <div className="policy-section">
              <h2>7. Compliance</h2>
              <p>
                We comply with all applicable laws and regulations regarding data protection and
                privacy. This includes fulfilling our obligations under local data protection laws.
              </p>
            </div>

            {/* Changes to the Policy */}
            <div className="policy-section">
              <h2>8. Changes to the Policy</h2>
              <p>
                This Privacy Policy may be updated periodically to reflect changes in our personal
                information practices or relevant laws. We will post a prominent notice on our site
                to notify you of any significant changes.
              </p>
            </div>

            {/* Contact Information */}
            <div className="policy-section">
              <h2>9. Contact Information</h2>
              <p>
                If you have any questions or concerns about our privacy practices, please get in
                touch with us:
              </p>
              <div className="policy-contact">
                <a href="tel:909-491-2203" className="policy-contact-link">
                  <PhoneIcon />
                  909-491-2203
                </a>
                <a href="mailto:orders@turf-world.com" className="policy-contact-link">
                  <EmailIcon />
                  orders@turf-world.com
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <footer className="policy-footer">
            <Link to="/terms-and-services">Terms & Services</Link>
            <span className="divider">|</span>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </footer>
        </div>
      </section>
    </div>
  );
}

/* Icons */
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
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
