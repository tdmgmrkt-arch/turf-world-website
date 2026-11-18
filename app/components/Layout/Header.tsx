/**
 * Header Component - Turf & Landscaping Storefront
 *
 * Strategic Design Principles:
 * - Solutions-based navigation (Application-centric, not specs)
 * - "Order Samples" as primary CTA (lead magnet funnel)
 * - Pro vs DIY toggle prepared for future implementation
 * - Accessibility: Icon + Label for all actions
 *
 * Performance:
 * - LCP: Header does not contain LCP elements
 * - CLS: Fixed height container prevents layout shift
 */
import {Suspense, useState, useCallback} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {MegaMenu, MegaMenuTrigger} from '~/components/Layout/MegaMenu';

export interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const openMegaMenu = useCallback(() => {
    setMegaMenuOpen(true);
  }, []);

  const closeMegaMenu = useCallback(() => {
    setMegaMenuOpen(false);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo / Brand */}
        <NavLink
          prefetch="intent"
          to="/"
          className="header-logo"
          aria-label={`${shop.name} - Home`}
        >
          <img
            src="/twlogo2.png"
            alt={shop.name}
            className="header-logo-img"
            width={140}
            height={40}
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav
          className="header-nav-desktop"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Products Mega Menu Trigger - hover activated */}
          <div
            className="mega-menu-wrapper"
            onMouseEnter={openMegaMenu}
            onMouseLeave={closeMegaMenu}
          >
            <MegaMenuTrigger isOpen={megaMenuOpen} />
            {/* Mega Menu Dropdown */}
            <MegaMenu isOpen={megaMenuOpen} onClose={closeMegaMenu} />
          </div>

          {/* Standard Nav Links */}
          <NavLink to="/about" className="header-nav-link" prefetch="intent">
            About
          </NavLink>
          <NavLink to="/contact" className="header-nav-link" prefetch="intent">
            Contact
          </NavLink>
          <NavLink to="/broker-program" className="header-nav-link" prefetch="intent">
            Broker Program
          </NavLink>
        </nav>

        {/* Header Actions (CTAs) */}
        <div className="header-actions">
          {/* Order Samples - Primary CTA (Lead Magnet) */}
          <NavLink to="/request-samples" className="header-samples-cta" prefetch="intent">
            <SamplesIcon />
            <span>Order Samples</span>
          </NavLink>

          {/* Pro/DIY Toggle - Future Enhancement */}
          {/* <ProDiyToggle /> */}

          {/* Search */}
          <SearchToggle />

          {/* Account */}
          <AccountLink isLoggedIn={isLoggedIn} />

          {/* Cart */}
          <CartToggle cart={cart} />

          {/* Mobile Menu Toggle */}
          <MobileMenuToggle />
        </div>
      </div>
    </header>
  );
}

/**
 * HeaderMenu - Used for mobile navigation in the Aside
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const {close} = useAside();

  const className = viewport === 'mobile' ? 'mobile-nav-menu' : 'desktop-nav-menu';

  return (
    <nav className={className} role="navigation">
      {/* Home link for mobile */}
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          to="/"
          className="mobile-nav-item"
        >
          <HomeIcon />
          <span>Home</span>
        </NavLink>
      )}

      {/* Solutions Section Header */}
      {viewport === 'mobile' && (
        <div className="mobile-nav-section">
          <span className="mobile-nav-section-title">Shop by Application</span>
        </div>
      )}

      {/* Solution Categories for Mobile */}
      {viewport === 'mobile' && (
        <>
          <NavLink onClick={close} prefetch="intent" to="/products" className="mobile-nav-item">
            <AllProductsIcon />
            <span>All Turf Products</span>
          </NavLink>
          <NavLink onClick={close} prefetch="intent" to="/products?filter=residential" className="mobile-nav-item">
            <LandscapeIcon />
            <span>Residential</span>
          </NavLink>
          <NavLink onClick={close} prefetch="intent" to="/products?filter=accessories" className="mobile-nav-item">
            <AccessoriesIcon />
            <span>Turf Installation Accessories</span>
          </NavLink>
          <NavLink onClick={close} prefetch="intent" to="/products?filter=pets" className="mobile-nav-item">
            <PetIcon />
            <span>Pet Turf</span>
          </NavLink>
          <NavLink onClick={close} prefetch="intent" to="/products?filter=putting-greens" className="mobile-nav-item">
            <GolfIcon />
            <span>Putting Greens</span>
          </NavLink>
          <NavLink onClick={close} prefetch="intent" to="/products?filter=commercial" className="mobile-nav-item">
            <CommercialIcon />
            <span>Commercial</span>
          </NavLink>
        </>
      )}

      {/* Divider */}
      {viewport === 'mobile' && <div className="mobile-nav-divider" />}

      {/* Standard Menu Items */}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

        return (
          <NavLink
            key={item.id}
            end
            onClick={close}
            prefetch="intent"
            to={url}
            className={viewport === 'mobile' ? 'mobile-nav-item' : 'header-nav-link'}
          >
            {item.title}
          </NavLink>
        );
      })}

      {/* Order Samples CTA in Mobile Menu */}
      {viewport === 'mobile' && (
        <>
          <div className="mobile-nav-divider" />
          <NavLink
            onClick={close}
            prefetch="intent"
            to="/products/sample-kit"
            className="mobile-nav-cta"
          >
            <SamplesIcon />
            <span>Order Free Samples</span>
          </NavLink>
        </>
      )}
    </nav>
  );
}

/* ============================================
   SUB-COMPONENTS
   ============================================ */

function MobileMenuToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-mobile-toggle"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <MenuIcon />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-icon-btn"
      onClick={() => open('search')}
      aria-label="Search products"
    >
      <SearchIcon />
    </button>
  );
}

function AccountLink({isLoggedIn}: {isLoggedIn: Promise<boolean>}) {
  return (
    <NavLink prefetch="intent" to="/account" className="header-icon-btn" aria-label="Account">
      <Suspense fallback={<AccountIcon />}>
        <Await resolve={isLoggedIn} errorElement={<AccountIcon />}>
          {(loggedIn) => (loggedIn ? <AccountIconFilled /> : <AccountIcon />)}
        </Await>
      </Suspense>
    </NavLink>
  );
}

function CartToggle({cart}: {cart: HeaderProps['cart']}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="header-cart-btn"
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      aria-label={`Cart${count ? ` (${count} items)` : ''}`}
    >
      <CartIcon />
      {count !== null && count > 0 && (
        <span className="header-cart-badge" aria-hidden="true">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}

/* ============================================
   ICONS - SVG Components
   ============================================ */

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function AccountIconFilled() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
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

function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function PetIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 9.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm9-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5 5c-2.33 0-7 1.17-7 3.5V19h14v-3c0-2.33-4.67-3.5-7-3.5zm6.5-5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
    </svg>
  );
}

function GolfIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2L4 8v12h16V8l-8-6zm0 2.5L18 9v9H6V9l6-4.5zM11 11v6h2v-6h-2z" />
    </svg>
  );
}

function LandscapeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function AllProductsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function AccessoriesIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CommercialIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

/* ============================================
   FALLBACK DATA
   ============================================ */

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/fallback',
  items: [
    {
      id: 'gid://shopify/MenuItem/products',
      resourceId: null,
      tags: [],
      title: 'All Products',
      type: 'HTTP',
      url: '/products',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/about',
      resourceId: null,
      tags: [],
      title: 'About',
      type: 'HTTP',
      url: '/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/contact',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'HTTP',
      url: '/contact',
      items: [],
    },
  ],
};
