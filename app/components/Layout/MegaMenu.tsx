/**
 * MegaMenu Component
 *
 * Solutions-based mega menu organized by Application (not technical specs).
 * Uses thumbnail images for visual wayfinding per the architectural directive.
 *
 * Design Principles:
 * - Solution-Centric: Pet Friendly, Putting Greens, High Traffic
 * - Visual Wayfinding: Image thumbnails, not just text
 * - CLS Prevention: Reserved space with aspect-ratio containers
 */
import {NavLink} from 'react-router';
import {useEffect} from 'react';

/** Solution category with image thumbnail */
export interface SolutionCategory {
  id: string;
  title: string;
  description: string;
  href: string;
  /** Placeholder image URL - will be replaced with real Shopify collection images */
  imageUrl: string;
  /** Alt text for accessibility */
  imageAlt: string;
}

/** Solution categories linking to products page with filters */
export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    id: 'all-products',
    title: 'All Turf Products',
    description: 'Browse our complete turf collection',
    href: '/products',
    imageUrl: '/all-turf.avif',
    imageAlt: 'Premium artificial turf selection',
  },
  {
    id: 'residential',
    title: 'Residential',
    description: 'Premium residential lawn replacement',
    href: '/products?filter=residential',
    imageUrl: '/residential.avif',
    imageAlt: 'Lush green residential lawn',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Heavy-duty solutions for businesses',
    href: '/products?filter=commercial',
    imageUrl: '/commercial.avif',
    imageAlt: 'Commercial building with turf landscaping',
  },
  {
    id: 'pet-turf',
    title: 'Pet Turf',
    description: 'Durable, easy-clean turf for dogs and pets',
    href: '/products?filter=pets',
    imageUrl: '/pets.avif',
    imageAlt: 'Dog playing on artificial grass',
  },
  {
    id: 'putting-greens',
    title: 'Putting Greens',
    description: 'Pro-grade golf turf for backyard practice',
    href: '/products?filter=putting-greens',
    imageUrl: '/golf.avif',
    imageAlt: 'Golf putting green with flag',
  },
  {
    id: 'accessories',
    title: 'Installation Accessories',
    description: 'Everything you need for installation',
    href: '/products?filter=accessories',
    imageUrl: '/Accesories.avif',
    imageAlt: 'Turf installation accessories and supplies',
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: SolutionCategory[];
}

export function MegaMenu({
  isOpen,
  onClose,
  categories = SOLUTION_CATEGORIES,
}: MegaMenuProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="mega-menu"
      role="menu"
      aria-label="Products menu"
    >
      <div className="mega-menu-container">
        {/* Section Header */}
        <div className="mega-menu-header">
          <h3 className="mega-menu-title">Shop by Application</h3>
          <p className="mega-menu-subtitle">
            Find the perfect turf for your project
          </p>
        </div>

        {/* Category Grid with Image Thumbnails */}
        <div className="mega-menu-grid">
          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={category.href}
              className="mega-menu-item"
              onClick={onClose}
              prefetch="intent"
            >
              {/* Image Container - aspect-ratio for CLS prevention */}
              <div className="mega-menu-item-image">
                <img
                  src={category.imageUrl}
                  alt={category.imageAlt}
                  className="mega-menu-image"
                  loading="lazy"
                />
              </div>
              <div className="mega-menu-item-content">
                <span className="mega-menu-item-title">{category.title}</span>
                <span className="mega-menu-item-desc">
                  {category.description}
                </span>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Quick Links Footer */}
        <div className="mega-menu-footer">
          <NavLink
            to="/products"
            className="mega-menu-link"
            onClick={onClose}
          >
            View All Products
          </NavLink>
          <NavLink
            to="/pages/turf-calculator"
            className="mega-menu-link"
            onClick={onClose}
          >
            <CalculatorIcon />
            <span>Turf Calculator</span>
          </NavLink>
          <NavLink
            to="/pages/installation-guide"
            className="mega-menu-link"
            onClick={onClose}
          >
            <GuideIcon />
            <span>Installation Guides</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

/** Calculator Icon */
function CalculatorIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}

/** Guide Icon */
function GuideIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

/**
 * MegaMenuTrigger - Link with dropdown on hover
 */
interface MegaMenuTriggerProps {
  isOpen: boolean;
}

export function MegaMenuTrigger({isOpen}: MegaMenuTriggerProps) {
  return (
    <NavLink
      to="/products"
      className="mega-menu-trigger"
      aria-expanded={isOpen}
      aria-haspopup="true"
      prefetch="intent"
    >
      <span>Products</span>
      <ChevronIcon isOpen={isOpen} />
    </NavLink>
  );
}

function ChevronIcon({isOpen}: {isOpen: boolean}) {
  return (
    <svg
      className={`mega-menu-chevron ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
