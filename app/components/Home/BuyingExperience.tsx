/**
 * BuyingExperience Component
 *
 * Highlights the speed and convenience of ordering from Turf World.
 * Three pillars: Same Day Will Call, Next Day Delivery, On-The-Go ordering.
 */

interface BuyingOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const BUYING_OPTIONS: BuyingOption[] = [
  {
    id: 'same-day',
    title: 'Same Day',
    subtitle: 'Will Call',
    description:
      'Your order will be ready for pick up within 2 hours of order placement. You will be loaded within 15 minutes.',
    icon: <ClockIcon />,
  },
  {
    id: 'next-day',
    title: 'Next Day',
    subtitle: 'Delivery',
    description:
      'We will deliver your order directly to you next day.',
    icon: <TruckIcon />,
  },
  {
    id: 'on-the-go',
    title: 'On-The-Go',
    subtitle: 'Ordering',
    description:
      'Place your order by calling us, online, or directly from your phone.',
    icon: <PhoneIcon />,
  },
];

export function BuyingExperience() {
  return (
    <section className="buying-experience" aria-labelledby="buying-experience-title">
      <div className="buying-experience-container">
        {/* Section Header */}
        <div className="buying-experience-header">
          <span className="buying-experience-label">Faster, Easier, Buying Experience</span>
          <h2 id="buying-experience-title" className="buying-experience-title">
            Get Your Turf When You Need It
          </h2>
        </div>

        {/* Options Grid */}
        <div className="buying-experience-grid">
          {BUYING_OPTIONS.map((option) => (
            <div key={option.id} className="buying-option">
              <div className="buying-option-icon">{option.icon}</div>
              <div className="buying-option-content">
                <h3 className="buying-option-title">
                  {option.title}
                  <span className="buying-option-subtitle">{option.subtitle}</span>
                </h3>
                <p className="buying-option-description">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ICONS
   ============================================ */

function ClockIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

function PhoneIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}
