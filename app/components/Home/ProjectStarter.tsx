/**
 * ProjectStarter Component
 *
 * "Find your perfect turf" wizard - the functional right side of the hero.
 * Routes users to solution-specific collections based on their project type.
 *
 * Design Principles:
 * - CLS Prevention: Fixed height container, reserved space
 * - Accessibility: Icon + Label pattern (deuteranopia-safe)
 * - Conversion Focus: Clear CTAs, minimal friction
 */
import {NavLink} from 'react-router';

/** Project type option */
interface ProjectOption {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const PROJECT_OPTIONS: ProjectOption[] = [
  {
    id: 'pet',
    label: 'Pet Turf',
    description: 'Durable, easy-clean turf for dogs & cats',
    href: '/collections/pet-turf',
    icon: <PetIcon />,
  },
  {
    id: 'play',
    label: 'Play & Sport',
    description: 'Safe surfaces for kids & athletic use',
    href: '/collections/playground',
    icon: <PlayIcon />,
  },
  {
    id: 'landscape',
    label: 'Landscape',
    description: 'Premium lawn replacement for any yard',
    href: '/collections/landscape',
    icon: <LandscapeIcon />,
  },
];

interface ProjectStarterProps {
  /** Optional custom title */
  title?: string;
  /** Optional custom subtitle */
  subtitle?: string;
  /** Optional custom options */
  options?: ProjectOption[];
}

export function ProjectStarter({
  title = 'Find your perfect turf',
  subtitle = "Tell us about your project and we'll guide you to the right solution.",
  options = PROJECT_OPTIONS,
}: ProjectStarterProps) {
  return (
    <div className="project-starter">
      {/* Header */}
      <div className="project-starter-header">
        <h1 className="project-starter-title">{title}</h1>
        <p className="project-starter-subtitle">{subtitle}</p>
      </div>

      {/* Project Type Selector */}
      <div className="project-starter-label">
        <span>I'm shopping for:</span>
      </div>

      <div className="project-starter-options">
        {options.map((option) => (
          <NavLink
            key={option.id}
            to={option.href}
            className="project-starter-option"
            prefetch="intent"
          >
            <div className="project-starter-option-icon">{option.icon}</div>
            <div className="project-starter-option-content">
              <span className="project-starter-option-label">{option.label}</span>
              <span className="project-starter-option-desc">{option.description}</span>
            </div>
            <ChevronRight />
          </NavLink>
        ))}
      </div>

      {/* Secondary Actions */}
      <div className="project-starter-actions">
        <NavLink to="/products/sample-kit" className="project-starter-cta-primary">
          <SamplesIcon />
          <span>Order Free Samples</span>
        </NavLink>
        <NavLink to="/pages/turf-calculator" className="project-starter-cta-secondary">
          <CalculatorIcon />
          <span>Calculate My Project</span>
        </NavLink>
      </div>

      {/* Trust Signals */}
      <div className="project-starter-trust">
        <TrustBadge icon={<ShippingIcon />} label="Free Shipping $500+" />
        <TrustBadge icon={<WarrantyIcon />} label="15-Year Warranty" />
        <TrustBadge icon={<SupportIcon />} label="Expert Support" />
      </div>
    </div>
  );
}

/* ============================================
   SUB-COMPONENTS
   ============================================ */

function TrustBadge({icon, label}: {icon: React.ReactNode; label: string}) {
  return (
    <div className="trust-badge">
      <span className="trust-badge-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="trust-badge-label">{label}</span>
    </div>
  );
}

/* ============================================
   ICONS
   ============================================ */

function PetIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 9.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm9-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5 5c-2.33 0-7 1.17-7 3.5V19h14v-3c0-2.33-4.67-3.5-7-3.5zm6.5-5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LandscapeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function SamplesIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function ShippingIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
