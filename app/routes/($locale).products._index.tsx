import type {Route} from './+types/products._index';
import {useState, useMemo, useEffect} from 'react';
import {useLoaderData, Link, useSearchParams} from 'react-router';
import {getPaginationVariables, Image, Money} from '@shopify/hydrogen';
import type {CatalogProductItemFragment} from 'storefrontapi.generated';

type SortOrder = 'default' | 'price-asc' | 'price-desc';

// Predefined collection filters matching Shopify store
const COLLECTION_FILTERS = [
  {handle: 'all', label: 'All Products'},
  {handle: 'residential', label: 'Residential'},
  {handle: 'commercial', label: 'Commercial'},
  {handle: 'pets', label: 'Pet'},
  {handle: 'putting-greens', label: 'Putting Greens'},
  {handle: 'accessories', label: 'Accessories'},
] as const;

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Shop All Products | Turf World'},
    {
      name: 'description',
      content:
        'Browse our complete selection of premium artificial turf. Free nationwide shipping, up to 16-year warranty, and 100% lead-free products.',
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 100,
  });

  const [{products}] = await Promise.all([
    storefront.query(ALL_PRODUCTS_QUERY, {
      variables: {...paginationVariables},
    }),
  ]);
  return {products};
}

function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function ProductsIndex() {
  const {products} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');

  // Initialize from URL param, default to 'all'
  const [activeCategory, setActiveCategory] = useState<string>(
    filterParam && COLLECTION_FILTERS.some(f => f.handle === filterParam)
      ? filterParam
      : 'all'
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');

  // Update URL when filter changes
  useEffect(() => {
    if (activeCategory === 'all') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', activeCategory);
    }
    setSearchParams(searchParams, {replace: true});
  }, [activeCategory, searchParams, setSearchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products.nodes];

    // Filter by collection
    if (activeCategory !== 'all') {
      result = result.filter((product) =>
        product.collections?.nodes?.some(
          (collection: {handle: string; title: string}) => collection.handle === activeCategory
        )
      );
    }

    // Sort by price
    if (sortOrder === 'price-asc') {
      result.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount),
      );
    } else if (sortOrder === 'price-desc') {
      result.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount),
      );
    }

    return result;
  }, [products.nodes, activeCategory, sortOrder]);

  return (
    <div className="shopify-products-page">
      {/* Hero Section */}
      <section className="shopify-products-hero">
        <div className="shopify-products-hero-content">
          <h1>Shop All Products</h1>
          <p>
            Premium artificial turf for every project. All products feature commercial-grade
            construction, UV stabilization, and industry-leading warranties.
          </p>
          <div className="shopify-products-hero-badges">
            <span className="hero-badge">
              <CheckIcon /> Free Nationwide Shipping
            </span>
            <span className="hero-badge">
              <CheckIcon /> Up to 16-Year Warranty
            </span>
            <span className="hero-badge">
              <CheckIcon /> 100% Lead-Free
            </span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="shopify-products-section">
        <div className="shopify-products-container">
          {products.nodes.length === 0 ? (
            <div className="shopify-products-empty">
              <EmptyIcon />
              <h2>No Products Yet</h2>
              <p>Products added to your Shopify store will appear here.</p>
              <Link to="/request-samples" className="empty-cta">
                Request Free Samples
              </Link>
            </div>
          ) : (
            <>
              {/* Filter & Sort Bar */}
              <div className="products-filter-bar">
                {/* Collection Filters */}
                <div className="products-filter-categories">
                  {COLLECTION_FILTERS.map((filter) => (
                    <button
                      key={filter.handle}
                      className={`filter-pill ${activeCategory === filter.handle ? 'filter-pill-active' : ''}`}
                      onClick={() => setActiveCategory(filter.handle)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="products-sort">
                  <label htmlFor="sort-select" className="sort-label">
                    <SortIcon />
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    className="sort-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  >
                    <option value="default">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="products-results-count">
                Showing {filteredProducts.length} of {products.nodes.length} products
                {activeCategory !== 'all' && ` in "${COLLECTION_FILTERS.find(f => f.handle === activeCategory)?.label || activeCategory}"`}
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="shopify-products-empty">
                  <FilterIcon />
                  <h2>No Products Found</h2>
                  <p>Try adjusting your filters to find what you're looking for.</p>
                  <button
                    className="empty-cta"
                    onClick={() => {
                      setActiveCategory('all');
                      setSortOrder('default');
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="shopify-products-grid">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      loading={index < 8 ? 'eager' : undefined}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="shopify-products-cta">
        <div className="shopify-products-cta-content">
          <h2>Not Sure Which Turf is Right?</h2>
          <p>Order free samples and see the quality for yourself before you buy.</p>
          <Link to="/request-samples" className="shopify-products-cta-btn">
            <SampleIcon />
            Request Free Samples
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  product,
  loading,
}: {
  product: CatalogProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <Link
      className="shopify-product-card"
      to={`/products/${product.handle}`}
      prefetch="intent"
    >
      <div className="shopify-product-card-image">
        {product.featuredImage ? (
          <Image
            alt={product.featuredImage.altText || product.title}
            aspectRatio="1/1"
            data={product.featuredImage}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        ) : (
          <div className="shopify-product-card-placeholder">
            <PlaceholderIcon />
          </div>
        )}
      </div>
      <div className="shopify-product-card-info">
        <h3>{product.title}</h3>
        <div className="shopify-product-card-price">
          <Money data={product.priceRange.minVariantPrice} />
          {product.priceRange.minVariantPrice.amount !==
            product.priceRange.maxVariantPrice.amount && (
            <span className="price-range">+</span>
          )}
        </div>
        <span className="shopify-product-card-cta">View Details →</span>
      </div>
    </Link>
  );
}

/* Icons */
function CheckIcon() {
  return (
    <svg className="icon-check" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SampleIcon() {
  return (
    <svg className="icon-sample" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg className="icon-empty" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function PlaceholderIcon() {
  return (
    <svg className="icon-placeholder" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg className="icon-sort" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg className="icon-filter" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    </svg>
  );
}

const CATALOG_PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyCatalogProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CatalogProductItem on Product {
    id
    handle
    title
    productType
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCatalogProductItem
      }
      maxVariantPrice {
        ...MoneyCatalogProductItem
      }
    }
    collections(first: 10) {
      nodes {
        handle
        title
      }
    }
  }
` as const;

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CatalogProductItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${CATALOG_PRODUCT_ITEM_FRAGMENT}
` as const;
