import {useState} from 'react';
import {useLoaderData} from 'react-router';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

// Import new Product components
import {
  ProductGallery,
  ProductOptions,
  ProductTabs,
  TrustSignals,
  SampleCTA,
  RelatedProducts,
} from '~/components/Product';
import {getProductData, getRollSqFt} from '~/data/products';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `${data?.product.title ?? 'Product'} | Turf World`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
    {
      name: 'description',
      content: data?.product.seo?.description || data?.product.description?.slice(0, 160),
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold.
 */
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load deferred data for below-the-fold content.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  const {storefront} = context;
  const {handle} = params;

  // Fetch related products from the same collection (deferred)
  const relatedProducts = storefront
    .query(RELATED_PRODUCTS_QUERY, {
      variables: {handle: handle || ''},
    })
    .then((result) => {
      // Get products from the first collection
      const collectionProducts = result.product?.collections?.nodes?.[0]?.products?.nodes || [];
      // Filter out the current product
      return collectionProducts.filter((p: {handle: string}) => p.handle !== handle);
    })
    .catch((error: Error) => {
      console.error('Error fetching related products:', error);
      return null;
    });

  return {
    relatedProducts,
  };
}

// Metafield key to human-readable label mapping
const METAFIELD_LABELS: Record<string, string> = {
  pile_height: 'Pile Height',
  face_weight: 'Face Weight',
  backing_type: 'Backing',
  drainage: 'Drainage',
  warranty_years: 'Warranty',
  yarn_type: 'Yarn Type',
  color: 'Color',
  roll_width: 'Roll Width',
  roll_length: 'Roll Length',
};

interface Metafield {
  key: string;
  value: string;
  namespace: string;
  type: string;
}

interface ProductSpec {
  label: string;
  value: string;
}

function transformMetafieldsToSpecs(metafields: (Metafield | null)[]): ProductSpec[] | undefined {
  const specs: ProductSpec[] = [];

  for (const metafield of metafields) {
    if (metafield && metafield.value) {
      const label = METAFIELD_LABELS[metafield.key] || metafield.key;
      specs.push({label, value: metafield.value});
    }
  }

  return specs.length > 0 ? specs : undefined;
}

export default function Product() {
  const {product, relatedProducts} = useLoaderData<typeof loader>();
  const {open} = useAside();
  const [quantity, setQuantity] = useState(1);

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml, description, handle, metafields} = product;

  // Transform metafields into specs for ProductTabs
  const specsFromMetafields = metafields
    ? transformMetafieldsToSpecs(metafields)
    : undefined;

  // Transform images for gallery
  const galleryImages = product.images?.nodes || [];
  if (galleryImages.length === 0 && selectedVariant?.image) {
    galleryImages.push(selectedVariant.image);
  }

  // Calculate total price
  const unitPrice = selectedVariant?.price ? parseFloat(selectedVariant.price.amount) : 0;
  const totalPrice = unitPrice * quantity;

  return (
    <div className="product-page-classic">
      {/* Breadcrumbs - Top of Page */}
      <nav className="product-breadcrumbs-top">
        <div className="product-breadcrumbs-inner">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products">Products</a>
          <span>/</span>
          <span className="current">{title}</span>
        </div>
      </nav>

      {/* ============================================
          TOP STAGE: Image Gallery + Buy Box Grid
          ============================================ */}
      <div className="product-top-stage">
        {/* Left Column - Main Image + Thumbnails */}
        <div className="product-gallery-column">
          <ProductGallery images={galleryImages} selectedVariantImage={selectedVariant?.image} />
        </div>

        {/* Right Column - Compact Buy Box (ends after Trust Badges) */}
        <div className="product-buybox-column">
          <div className="product-control-panel">
            {/* ========== TOP HEADER (Full Width) ========== */}
            <div className="control-panel-header">
              <h1 className="control-panel-title">{title}</h1>
              <div className="control-panel-rating">
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= 4} />
                  ))}
                </div>
                <span className="rating-count">4.8 (127 reviews)</span>
              </div>
              {description && (
                <p className="control-panel-description">{description}</p>
              )}
            </div>

            {/* ========== SPLIT ACTION ROW (2 Columns) ========== */}
            <div className="control-panel-split">
              {/* Left Column - Purchase Tools */}
              <div className="split-left">
                {/* Price */}
                <div className="control-panel-price">
                  <div className="price-main">
                    {selectedVariant?.compareAtPrice && (
                      <span className="price-was">
                        ${parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)}
                      </span>
                    )}
                    <span className="price-now">${unitPrice.toFixed(2)}</span>
                    <span className="price-per">/ sq ft</span>
                  </div>
                  {selectedVariant?.compareAtPrice && (
                    <span className="price-save-badge">Save 15%</span>
                  )}
                </div>

                {/* Variant Options */}
                <ProductOptions productOptions={productOptions} />

                {/* Quantity Selector */}
                <div className="control-panel-quantity">
                  <label className="quantity-label">Quantity (rolls)</label>
                  <div className="quantity-stepper">
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon />
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button
                      type="button"
                      className="quantity-btn"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <PlusIcon />
                    </button>
                  </div>
                  <span className="quantity-coverage">
                    = {(quantity * getRollSqFt(handle)).toLocaleString()} sq ft
                  </span>
                </div>

                {/* Calculate Need Dropdown */}
                <CalculateNeedDropdown
                  rollSqFt={getRollSqFt(handle)}
                  onCalculate={(rolls) => setQuantity(rolls)}
                />
              </div>

              {/* Right Column - Quick Specs */}
              <div className="split-right">
                <QuickSpecs handle={handle} metafields={specsFromMetafields} />
              </div>
            </div>

            {/* ========== BOTTOM ROW (Full Width) ========== */}
            <div className="control-panel-actions">
              <AddToCartButton
                disabled={!selectedVariant || !selectedVariant.availableForSale}
                onClick={() => open('cart')}
                lines={
                  selectedVariant
                    ? [
                        {
                          merchandiseId: selectedVariant.id,
                          quantity: quantity,
                          selectedVariant,
                        },
                      ]
                    : []
                }
              >
                {selectedVariant?.availableForSale ? (
                  <>
                    <CartIcon />
                    <span>Add to Cart</span>
                    <span className="btn-price">${totalPrice.toFixed(2)}</span>
                  </>
                ) : (
                  'Sold Out'
                )}
              </AddToCartButton>
              <SampleCTA />
            </div>

            {/* Trust Badges */}
            <div className="control-panel-trust">
              <TrustSignals />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          DETAILS SECTION: Full-Width Tabbed Content
          ============================================ */}
      <div className="product-details-section">
        <ProductTabs
          description={descriptionHtml || description || ''}
          handle={handle}
          specs={specsFromMetafields}
        />
      </div>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />

      {/* Analytics */}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: quantity,
            },
          ],
        }}
      />
    </div>
  );
}

function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function StarIcon({filled}: {filled: boolean}) {
  return (
    <svg
      className="star-icon"
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={filled ? 0 : 1.5}
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="8" x2="12" y2="8" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="4" x2="8" y2="12" />
      <line x1="4" y1="8" x2="12" y2="8" />
    </svg>
  );
}

/* ============================================
   CALCULATE NEED DROPDOWN
   ============================================ */

interface CalculateNeedDropdownProps {
  rollSqFt: number;
  onCalculate: (rolls: number) => void;
}

function CalculateNeedDropdown({rollSqFt, onCalculate}: CalculateNeedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');

  const sqFtNeeded = length && width ? parseFloat(length) * parseFloat(width) : 0;
  const rollsNeeded = sqFtNeeded > 0 ? Math.ceil((sqFtNeeded * 1.1) / rollSqFt) : 0; // +10% for cuts

  const handleApply = () => {
    if (rollsNeeded > 0) {
      onCalculate(rollsNeeded);
      setIsOpen(false);
    }
  };

  return (
    <div className="calculate-need-dropdown">
      <button
        type="button"
        className="calculate-need-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <CalculatorIcon />
        <span>Calculate How Much You Need</span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="calculate-need-panel">
          <div className="calculate-inputs">
            <div className="calculate-field">
              <label>Length (ft)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
            <span className="calculate-x">×</span>
            <div className="calculate-field">
              <label>Width (ft)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {sqFtNeeded > 0 && (
            <div className="calculate-result">
              <div className="result-row">
                <span>Area needed:</span>
                <strong>{sqFtNeeded.toLocaleString()} sq ft</strong>
              </div>
              <div className="result-row">
                <span>With 10% extra:</span>
                <strong>{Math.ceil(sqFtNeeded * 1.1).toLocaleString()} sq ft</strong>
              </div>
              <div className="result-row highlight">
                <span>Rolls needed:</span>
                <strong>{rollsNeeded} roll{rollsNeeded !== 1 ? 's' : ''}</strong>
              </div>
              <button type="button" className="calculate-apply-btn" onClick={handleApply}>
                Apply to Cart
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CalculatorIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function ChevronIcon({isOpen}: {isOpen: boolean}) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ============================================
   QUICK SPECS COMPONENT
   ============================================ */

// Key specs to show in the quick view (in order)
const QUICK_SPEC_KEYS = [
  'Pile Height',
  'Total Weight',
  'Face Weight',
  'Yarn Shape',
  'Warranty',
  'Drainage',
  'Roll Size',
];

interface QuickSpecsProps {
  handle: string;
  metafields?: ProductSpec[];
}

function QuickSpecs({handle, metafields}: QuickSpecsProps) {
  const productData = getProductData(handle);
  const allSpecs = metafields || productData?.specs || [];

  // Filter to only show key specs
  const quickSpecs = QUICK_SPEC_KEYS
    .map((key) => allSpecs.find((s) => s.label === key))
    .filter((spec): spec is ProductSpec => spec !== undefined)
    .slice(0, 6); // Max 6 specs

  if (quickSpecs.length === 0) {
    return null;
  }

  return (
    <div className="quick-specs">
      <h3 className="quick-specs-title">
        <SpecsIcon />
        Key Specs
      </h3>
      <ul className="quick-specs-list">
        {quickSpecs.map((spec) => (
          <li key={spec.label}>
            <span className="spec-label">{spec.label}</span>
            <span className="spec-value">{spec.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpecsIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

/* ============================================
   GRAPHQL QUERIES
   ============================================ */

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 10) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
    metafields(identifiers: [
      {namespace: "custom", key: "pile_height"},
      {namespace: "custom", key: "face_weight"},
      {namespace: "custom", key: "backing_type"},
      {namespace: "custom", key: "drainage"},
      {namespace: "custom", key: "warranty_years"},
      {namespace: "custom", key: "yarn_type"},
      {namespace: "custom", key: "color"},
      {namespace: "custom", key: "roll_width"},
      {namespace: "custom", key: "roll_length"}
    ]) {
      key
      value
      namespace
      type
    }
    variants(first: 50) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;

const RELATED_PRODUCTS_QUERY = `#graphql
  query RelatedProducts(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      collections(first: 1) {
        nodes {
          products(first: 5) {
            nodes {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
` as const;
