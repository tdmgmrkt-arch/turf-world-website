/**
 * Contact Us Page
 *
 * Contact form and company contact information
 */
import {useState} from 'react';
import {Link} from 'react-router';
import type {Route} from './+types/contact';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Contact Us | Turf World'},
    {
      name: 'description',
      content:
        'Get in touch with Turf World. Contact our team for questions about artificial turf products, pricing, or custom orders.',
    },
  ];
};

// Webhook URL placeholder - replace with actual GHL webhook
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/PLACEHOLDER_CONTACT_WEBHOOK_ID';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    smsConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const webhookData = {
      ...formData,
      source: 'Turf World Website - Contact Form',
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          smsConsent: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>Have questions? We're here to help you find the perfect turf solution.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              <p className="form-intro">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="contact-success">
                  <SuccessIcon />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll be in touch shortly.</p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="contact-error">
                  <p>There was an error sending your message. Please try again or call us directly.</p>
                </div>
              )}

              {/* Form */}
              {submitStatus !== 'success' && (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">
                        Email <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company Name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">
                      Subject <span className="required">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Pricing Request">Pricing Request</option>
                      <option value="Custom Order">Custom Order</option>
                      <option value="Shipping Question">Shipping Question</option>
                      <option value="Warranty Claim">Warranty Claim</option>
                      <option value="Contractor Partnership">Contractor Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>

                  {/* SMS Consent */}
                  <div className="consent-checkbox">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.smsConsent}
                        onChange={(e) =>
                          setFormData((prev) => ({...prev, smsConsent: e.target.checked}))
                        }
                      />
                      <span className="checkbox-custom"></span>
                      <span className="consent-text">
                        I agree to receive SMS messages from Turf-World. Msg & data rates may apply.
                        Reply STOP to unsubscribe.
                      </span>
                    </label>
                  </div>

                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="info-card">
                <h3>Get in Touch</h3>
                <p>
                  We're available Monday through Friday to answer your questions and help you find
                  the right turf for your project.
                </p>

                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">
                      <PhoneIcon />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Phone</span>
                      <a href="tel:1-800-555-TURF" className="info-value">
                        1-800-555-TURF
                      </a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <EmailIcon />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Email</span>
                      <a href="mailto:support@turfworld.com" className="info-value">
                        support@turfworld.com
                      </a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <ClockIcon />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Business Hours</span>
                      <span className="info-value">Mon - Fri: 8am - 6pm PST</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <LocationIcon />
                    </div>
                    <div className="info-content">
                      <span className="info-label">Location</span>
                      <span className="info-value">
                        Los Angeles, CA
                        <br />
                        <small>Serving all 50 states</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="quick-links-card">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <Link to="/request-samples">
                      <SampleIcon />
                      Request Free Samples
                    </Link>
                  </li>
                  <li>
                    <Link to="/products">
                      <ProductIcon />
                      Browse All Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq">
                      <FAQIcon />
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Icons */
function SuccessIcon() {
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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function SampleIcon() {
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

function ProductIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
