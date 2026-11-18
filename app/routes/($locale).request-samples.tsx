/**
 * Request Samples Page
 *
 * Form to request turf sample packs
 * Posts data to LeadConnector/GHL webhook
 */
import {useState} from 'react';
import {Link} from 'react-router';
import type {Route} from './+types/request-samples';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Request Free Turf Samples | Turf World'},
    {
      name: 'description',
      content:
        'Request free artificial turf samples from Turf World. Choose from our premium selection of wholesale turf products and see the quality for yourself.',
    },
  ];
};

// Turf sample options
const TURF_SAMPLES = [
  {id: 'europe-65', name: 'Europe 65', specs: 'W: 65oz / 1.25in'},
  {id: 'california-65', name: 'California 65', specs: 'W: 65oz / 1.25in'},
  {id: 'arizona-76', name: 'Arizona 76', specs: 'W: 76oz / 1.50in'},
  {id: 'hawaii-80', name: 'Hawaii 80', specs: 'W: 80oz / 1.50in'},
  {id: 'florida-80', name: 'Florida 80', specs: 'W: 80oz / 1.50in'},
  {id: 'texas-80', name: 'Texas 80', specs: 'W: 80oz / 1.50in'},
  {id: 'hawaii-87', name: 'Hawaii 87', specs: 'W: 87oz / 1.75in'},
  {id: 'idaho-93', name: 'Idaho 93', specs: 'W: 93oz / 1.75in'},
  {id: 'nevada-95', name: 'Nevada 95', specs: 'W: 95oz / 1.75in'},
  {id: 'colorado-95', name: 'Colorado 95', specs: 'W: 95oz / 1.75in'},
  {id: 'hawaii-96', name: 'Hawaii 96', specs: 'W: 96oz / 2.0in'},
  {id: 'super-natural-96', name: 'Super Natural 96', specs: 'W: 96oz / 2.0in'},
  {id: 'texas-108', name: 'Texas 108', specs: 'W: 108oz / 1.75in'},
  {id: 'nevada-110', name: 'Nevada 110', specs: 'W: 110oz / 2.3in'},
  {id: 'super-natural-120', name: 'Super Natural 120', specs: 'W: 120oz / 2.0in'},
  {id: 'texas-130', name: 'Texas 130', specs: 'W: 130oz / 2.0in'},
  {id: 'olive-73-pet', name: 'Olive 73 - PET', specs: 'W: 73oz / 1.5in'},
  {id: 'bermuda-87-pet', name: 'Bermuda 87 - PET', specs: 'W: 87oz / 1.75in'},
  {id: 'olive-92-pet', name: 'Olive 92 - PET', specs: 'W: 92oz / 2.0in'},
  {id: 'bermuda-93-pet', name: 'Bermuda 93 - PET', specs: 'W: 93oz / 2.0in'},
  {id: 'putting-green', name: 'Putting Green', specs: 'W: 85oz'},
  {id: 'thousand-pine-putting', name: 'Thousand Pine Putting Green', specs: 'W: 79oz'},
];

// Webhook URL placeholder - replace with actual GHL webhook
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/PLACEHOLDER_WEBHOOK_ID';

export default function RequestSamples() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    email: '',
    phone: '',
    samples: [] as string[],
    smsConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSampleToggle = (sampleId: string) => {
    setFormData((prev) => ({
      ...prev,
      samples: prev.samples.includes(sampleId)
        ? prev.samples.filter((id) => id !== sampleId)
        : [...prev.samples, sampleId],
    }));
  };

  const handleSelectAll = () => {
    const allIds = TURF_SAMPLES.map((s) => s.id);
    const allSelected = formData.samples.length === TURF_SAMPLES.length;
    setFormData((prev) => ({
      ...prev,
      samples: allSelected ? [] : allIds,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Get selected sample names for the webhook
    const selectedSampleNames = formData.samples.map((id) => {
      const sample = TURF_SAMPLES.find((s) => s.id === id);
      return sample ? `${sample.name} - ${sample.specs}` : id;
    });

    const webhookData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      email: formData.email,
      phone: formData.phone,
      turfSamples: selectedSampleNames.join(', '),
      smsConsent: formData.smsConsent,
      source: 'Turf World Website - Sample Request',
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
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          email: '',
          phone: '',
          samples: [],
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
    <div className="samples-page">
      {/* Hero Section */}
      <section className="samples-hero">
        <div className="samples-hero-content">
          <h1>Request Turf Samples</h1>
          <p>
            Please enter your info below and select the turf samples you wish to include in your
            sample pack.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="samples-form-section">
        <div className="samples-container">
          {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="samples-success">
            <SuccessIcon />
            <h2>Thank You!</h2>
            <p>
              Your sample request has been submitted successfully. We'll be in touch shortly to
              confirm your order.
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="samples-error">
            <p>There was an error submitting your request. Please try again or contact us directly.</p>
          </div>
        )}

        {/* Form */}
        {submitStatus !== 'success' && (
          <form onSubmit={handleSubmit} className="samples-form">
            {/* Contact Information */}
            <div className="form-section">
              <h2>Contact Information</h2>
              <div className="form-grid">
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

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </div>

              <div className="form-grid form-grid-3">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="Postal Code"
                  />
                </div>
              </div>

              <div className="form-grid">
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
                  <label htmlFor="phone">
                    Phone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Turf Samples Selection */}
            <div className="form-section">
              <h2>Turf Samples</h2>
              <p className="form-section-description">
                Select the samples you'd like to receive in your sample pack.
              </p>

              {/* Select All Option */}
              <div className="sample-option select-all">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.samples.length === TURF_SAMPLES.length}
                    onChange={handleSelectAll}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="sample-name">ALL Samples</span>
                </label>
              </div>

              {/* Individual Samples */}
              <div className="samples-grid">
                {TURF_SAMPLES.map((sample) => (
                  <div key={sample.id} className="sample-option">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.samples.includes(sample.id)}
                        onChange={() => handleSampleToggle(sample.id)}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="sample-info">
                        <span className="sample-name">{sample.name}</span>
                        <span className="sample-specs">{sample.specs}</span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Consent */}
            <div className="form-section">
              <div className="consent-option">
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
                    I agree to receive SMS messages from Turf-World at the number provided. Msg &
                    data rates may apply. Reply STOP to unsubscribe.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  Submitting...
                </>
              ) : (
                'SUBMIT'
              )}
            </button>
          </form>
        )}

          {/* Footer Links */}
          <footer className="samples-footer">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* Icons */
function SuccessIcon() {
  return (
    <svg
      className="success-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="spinner-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle
        className="spinner-track"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <path
        className="spinner-head"
        fill="currentColor"
        d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"
      />
    </svg>
  );
}
