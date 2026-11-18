/**
 * ProductInfo Component
 *
 * Displays product header information:
 * - Breadcrumb navigation
 * - Title and vendor
 * - Rating placeholder
 * - Price with sale indicator
 * - SKU
 */
import {Link} from 'react-router';
import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

interface ProductInfoProps {
  title: string;
  vendor?: string;
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  sku?: string;
  handle: string;
}

export function ProductInfo({
  title,
  vendor,
  price,
  compareAtPrice,
  sku,
  handle,
}: ProductInfoProps) {
  const isOnSale = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount || '0');

  return (
    <div className="product-info">
      {/* Breadcrumbs */}
      <nav className="product-breadcrumbs" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
            <BreadcrumbSeparator />
          </li>
          <li className="breadcrumb-item">
            <Link to="/products">Shop</Link>
            <BreadcrumbSeparator />
          </li>
          <li className="breadcrumb-item current" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>

      {/* Vendor/Brand */}
      {vendor && (
        <div className="product-vendor">
          <Link to={`/collections/vendors?q=${encodeURIComponent(vendor)}`}>
            {vendor}
          </Link>
        </div>
      )}

      {/* Title */}
      <h1 className="product-title">{title}</h1>

      {/* Rating Placeholder */}
      <div className="product-rating">
        <div className="product-rating-stars">
          <StarIcon filled />
          <StarIcon filled />
          <StarIcon filled />
          <StarIcon filled />
          <StarIcon half />
        </div>
        <span className="product-rating-count">4.8 (124 reviews)</span>
      </div>

      {/* Price */}
      <div className="product-price-display">
        {isOnSale && compareAtPrice && (
          <span className="product-price-compare">
            <Money data={compareAtPrice} />
          </span>
        )}
        {price && (
          <span className={`product-price-current ${isOnSale ? 'on-sale' : ''}`}>
            <Money data={price} />
          </span>
        )}
        {isOnSale && (
          <span className="product-price-badge">Sale</span>
        )}
      </div>

      {/* Price per sq ft indicator */}
      {price && (
        <div className="product-price-unit">
          Starting at <strong>${(parseFloat(price.amount) / 15).toFixed(2)}</strong>/sq ft
        </div>
      )}

      {/* SKU */}
      {sku && (
        <div className="product-sku">
          SKU: <span>{sku}</span>
        </div>
      )}
    </div>
  );
}

function BreadcrumbSeparator() {
  return (
    <svg className="breadcrumb-separator" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function StarIcon({filled = false, half = false}: {filled?: boolean; half?: boolean}) {
  if (half) {
    return (
      <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor">
        <defs>
          <linearGradient id="half-fill">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-fill)"
          stroke="currentColor"
          strokeWidth={1}
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    );
  }

  return (
    <svg className="star-icon" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={filled ? 0 : 1}
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  );
}
