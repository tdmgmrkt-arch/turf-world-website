/**
 * Premium Footer Component - Turf & Landscaping Storefront
 *
 * Design Principles:
 * - Trust & credibility signals for high-consideration purchase
 * - Solution-centric navigation mirroring the mega menu
 * - Freight/logistics reassurance (addressing shipping anxiety)
 * - Accessibility: Icon + Label pattern throughout
 */
import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  const shopName = header.shop.name;

  return (
    <footer className="site-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Brand Column */}
          <div className="footer-brand">
            <NavLink to="/" className="footer-logo" aria-label={`${shopName} - Home`}>
              <img
                src="/Turf World-alt-logo.avif"
                alt={shopName}
                className="footer-logo-img"
                width={160}
                height={45}
              />
            </NavLink>
            <p className="footer-tagline">
              Premium artificial turf solutions for residential and commercial projects.
              Transform your outdoor space with low-maintenance, eco-friendly grass.
            </p>

            {/* Trust Badges */}
            <div className="footer-trust-badges">
              <div className="footer-trust-badge">
                <WarrantyIcon />
                <span>15-Year Warranty</span>
              </div>
              <div className="footer-trust-badge">
                <ShippingIcon />
                <span>Free Shipping $500+</span>
              </div>
              <div className="footer-trust-badge">
                <USAIcon />
                <span>Made in USA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="footer-social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Pinterest"
              >
                <PinterestIcon />
              </a>
            </div>
          </div>

          {/* Shop by Application */}
          <div className="footer-column">
            <h3 className="footer-column-title">Shop by Application</h3>
            <ul className="footer-links">
              <li>
                <NavLink to="/collections/pet-turf" prefetch="intent">
                  Pet Turf
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/putting-greens" prefetch="intent">
                  Putting Greens
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/playground" prefetch="intent">
                  Playground & Play Areas
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/landscape" prefetch="intent">
                  Landscape & Lawn
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/sport" prefetch="intent">
                  Sport & Athletic
                </NavLink>
              </li>
              <li>
                <NavLink to="/collections/commercial" prefetch="intent">
                  Commercial Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" prefetch="intent">
                  View All Products
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-column">
            <h3 className="footer-column-title">Resources</h3>
            <ul className="footer-links">
              <li>
                <NavLink to="/pages/turf-calculator" prefetch="intent">
                  Turf Calculator
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/installation-guide" prefetch="intent">
                  Installation Guides
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/maintenance-tips" prefetch="intent">
                  Maintenance Tips
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs/journal" prefetch="intent">
                  Blog & Ideas
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/faq" prefetch="intent">
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/products/sample-kit" prefetch="intent">
                  Order Free Samples
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-column">
            <h3 className="footer-column-title">Customer Service</h3>
            <ul className="footer-links">
              <li>
                <NavLink to="/pages/contact" prefetch="intent">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/shipping-info" prefetch="intent">
                  Shipping & Delivery
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/returns" prefetch="intent">
                  Returns & Refunds
                </NavLink>
              </li>
              <li>
                <NavLink to="/account" prefetch="intent">
                  My Account
                </NavLink>
              </li>
              <li>
                <NavLink to="/account/orders" prefetch="intent">
                  Track My Order
                </NavLink>
              </li>
              <li>
                <NavLink to="/pages/pro-program" prefetch="intent">
                  Pro/Contractor Program
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column footer-contact">
            <h3 className="footer-column-title">Get in Touch</h3>
            <div className="footer-contact-info">
              <a href="tel:1-800-555-TURF" className="footer-contact-item">
                <PhoneIcon />
                <span>1-800-555-TURF</span>
              </a>
              <a href="mailto:support@example.com" className="footer-contact-item">
                <EmailIcon />
                <span>support@example.com</span>
              </a>
              <div className="footer-contact-item">
                <ClockIcon />
                <span>Mon-Fri: 8am-6pm PST</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="footer-newsletter">
              <h4 className="footer-newsletter-title">Stay Updated</h4>
              <p className="footer-newsletter-text">
                Get tips, project ideas, and exclusive offers.
              </p>
              <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="footer-newsletter-input"
                  aria-label="Email address"
                />
                <button type="submit" className="footer-newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Reassurance Bar */}
      <div className="footer-shipping-bar">
        <div className="footer-container footer-shipping-content">
          <div className="footer-shipping-item">
            <TruckIcon />
            <div>
              <strong>Freight-Friendly Shipping</strong>
              <span>Large orders ship via freight with liftgate delivery</span>
            </div>
          </div>
          <div className="footer-shipping-item">
            <BoxIcon />
            <div>
              <strong>Flexible Roll Sizes</strong>
              <span>15ft width rolls, cut to your length</span>
            </div>
          </div>
          <div className="footer-shipping-item">
            <CalculatorIcon />
            <div>
              <strong>Free Project Quotes</strong>
              <span>Get a custom estimate for your project</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Legal Links */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-content">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {shopName}. All rights reserved.
          </p>

          {/* Legal Menu from Shopify */}
          <Suspense fallback={<FooterLegalFallback />}>
            <Await resolve={footerPromise}>
              {(footer) => (
                <FooterLegalMenu
                  menu={footer?.menu}
                  primaryDomainUrl={header.shop.primaryDomain?.url || ''}
                  publicStoreDomain={publicStoreDomain}
                />
              )}
            </Await>
          </Suspense>

          {/* Payment Icons */}
          <div className="footer-payments">
            <span className="footer-payments-label">We Accept:</span>
            <div className="footer-payment-icons">
              <VisaIcon />
              <MastercardIcon />
              <AmexIcon />
              <PayPalIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Footer Legal Menu - Renders policy links from Shopify
 */
function FooterLegalMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: string;
  publicStoreDomain: string;
}) {
  const items = (menu || FALLBACK_FOOTER_MENU).items;

  return (
    <nav className="footer-legal-nav" role="navigation" aria-label="Legal">
      {items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');

        return isExternal ? (
          <a
            href={url}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
            className="footer-legal-link"
          >
            {item.title}
          </a>
        ) : (
          <NavLink
            key={item.id}
            prefetch="intent"
            to={url}
            className="footer-legal-link"
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function FooterLegalFallback() {
  return (
    <nav className="footer-legal-nav" role="navigation" aria-label="Legal">
      <span className="footer-legal-link">Privacy Policy</span>
      <span className="footer-legal-link">Terms of Service</span>
    </nav>
  );
}

/* ============================================
   FALLBACK DATA
   ============================================ */

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/fallback-footer',
  items: [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      url: '/policies/privacy-policy',
    },
    {
      id: 'refund',
      title: 'Refund Policy',
      url: '/policies/refund-policy',
    },
    {
      id: 'shipping',
      title: 'Shipping Policy',
      url: '/policies/shipping-policy',
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      url: '/policies/terms-of-service',
    },
  ],
};

/* ============================================
   ICONS
   ============================================ */

function WarrantyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function ShippingIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

function USAIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function VisaIcon() {
  return (
    <svg className="h-6 w-auto" viewBox="0 0 50 32" fill="currentColor" aria-label="Visa">
      <rect width="50" height="32" rx="4" fill="#1A1F71" />
      <path d="M21.5 21.5h-3l1.9-11.5h3l-1.9 11.5zm8.1-11.2c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.5-5.1 3.7 0 1.6 1.5 2.5 2.6 3 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.2-1.9 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.5c.7.3 2.1.6 3.5.6 3.2 0 5.2-1.5 5.2-3.8 0-1.3-.8-2.2-2.5-3-.5-.3-1.2-.6-1.7-.9-.4-.2-.7-.5-.7-.9 0-.4.4-.7 1.3-.7.7 0 1.3.1 1.9.4l.2.1.3-2.4z" fill="#fff"/>
      <path d="M35 10h-2.3c-.7 0-1.2.2-1.5.9l-4.3 9.6h3l.6-1.6h3.7c.1.4.3 1.6.3 1.6h2.7L35 10zm-3.5 7.3l1.1-3 .7 3h-1.8zM18 10l-3 7.8-.3-1.5c-.5-1.8-2.2-3.7-4.1-4.7l2.6 9.8h3.1L21.1 10H18z" fill="#fff"/>
      <path d="M12.3 10H7.1l-.1.3c3.7.9 6.1 3.1 7.1 5.7l-1-4.9c-.2-.7-.7-1-1.4-1.1h-.4z" fill="#F9A51A"/>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg className="h-6 w-auto" viewBox="0 0 50 32" fill="currentColor" aria-label="Mastercard">
      <rect width="50" height="32" rx="4" fill="#000" />
      <circle cx="19" cy="16" r="8" fill="#EB001B" />
      <circle cx="31" cy="16" r="8" fill="#F79E1B" />
      <path d="M25 9.4c1.9 1.5 3.1 3.9 3.1 6.6s-1.2 5.1-3.1 6.6c-1.9-1.5-3.1-3.9-3.1-6.6s1.2-5.1 3.1-6.6z" fill="#FF5F00" />
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg className="h-6 w-auto" viewBox="0 0 50 32" fill="currentColor" aria-label="American Express">
      <rect width="50" height="32" rx="4" fill="#006FCF" />
      <path d="M10 12h4l1.5 3.2 1.5-3.2h4v8h-2.5v-5.5l-2 4.5h-2l-2-4.5V20H10v-8zm14 0h7v2h-4.5v1h4.3v2h-4.3v1h4.5v2h-7v-8zm9 0h2.5l2 3 2-3H42l-3.3 4 3.5 4h-2.7l-2-3-2 3h-2.7l3.5-4-3.3-4z" fill="#fff"/>
    </svg>
  );
}

function PayPalIcon() {
  return (
    <svg className="h-6 w-auto" viewBox="0 0 50 32" fill="currentColor" aria-label="PayPal">
      <rect width="50" height="32" rx="4" fill="#003087" />
      <path d="M19 9h5c2.5 0 4 1.5 3.5 4-.5 3-2.5 4.5-5 4.5h-2l-.5 3.5h-3l2-12zm3 6h1.5c1 0 2-.5 2-1.5s-.5-1.5-1.5-1.5h-1.5l-.5 3zm10-6h5c2.5 0 4 1.5 3.5 4-.5 3-2.5 4.5-5 4.5h-2l-.5 3.5h-3l2-12zm3 6h1.5c1 0 2-.5 2-1.5s-.5-1.5-1.5-1.5h-1.5l-.5 3z" fill="#fff"/>
      <path d="M14 12h5c2.5 0 4 1.5 3.5 4-.5 3-2.5 4.5-5 4.5h-2l-.5 3.5h-3l2-12zm3 6h1.5c1 0 2-.5 2-1.5s-.5-1.5-1.5-1.5h-1.5l-.5 3z" fill="#009CDE"/>
    </svg>
  );
}
