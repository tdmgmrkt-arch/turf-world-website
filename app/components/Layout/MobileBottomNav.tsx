/**
 * MobileBottomNav Component
 *
 * Thumb-zone optimized bottom navigation bar for mobile viewports.
 * Per architectural directive: 57%+ traffic is mobile, so key functional
 * nav items (Calculator, Samples, Cart) must be easily accessible.
 *
 * Design Principles:
 * - Thumb Zone: All actions within natural thumb reach
 * - CLS Prevention: Fixed height, no dynamic content
 * - Accessibility: Icon + Label pattern
 */
import {NavLink} from 'react-router';
import {Suspense} from 'react';
import {Await, useAsyncValue} from 'react-router';
import {useOptimisticCart} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface MobileBottomNavProps {
  cart: Promise<CartApiQueryFragment | null>;
}

export function MobileBottomNav({cart}: MobileBottomNavProps) {
  const {open} = useAside();

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {/* Home */}
      <NavLink to="/" className="mobile-bottom-nav-item" end>
        <HomeIcon />
        <span>Home</span>
      </NavLink>

      {/* Calculator */}
      <NavLink to="/pages/turf-calculator" className="mobile-bottom-nav-item">
        <CalculatorIcon />
        <span>Calculator</span>
      </NavLink>

      {/* Samples - Primary CTA */}
      <NavLink to="/products/sample-kit" className="mobile-bottom-nav-item mobile-bottom-nav-cta">
        <div className="mobile-bottom-nav-cta-icon">
          <SamplesIcon />
        </div>
        <span>Samples</span>
      </NavLink>

      {/* Search */}
      <button
        className="mobile-bottom-nav-item"
        onClick={() => open('search')}
        aria-label="Search"
      >
        <SearchIcon />
        <span>Search</span>
      </button>

      {/* Cart */}
      <Suspense fallback={<CartNavItem count={0} />}>
        <Await resolve={cart}>
          <CartNavItemResolved />
        </Await>
      </Suspense>
    </nav>
  );
}

function CartNavItemResolved() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartNavItem count={cart?.totalQuantity ?? 0} />;
}

function CartNavItem({count}: {count: number}) {
  const {open} = useAside();

  return (
    <button
      className="mobile-bottom-nav-item"
      onClick={() => open('cart')}
      aria-label={`Cart${count > 0 ? ` (${count} items)` : ''}`}
    >
      <div className="relative">
        <CartIcon />
        {count > 0 && (
          <span className="mobile-bottom-nav-badge" aria-hidden="true">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>
      <span>Cart</span>
    </button>
  );
}

/* ============================================
   ICONS
   ============================================ */

function HomeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function SamplesIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}
