/**
 * RelatedProducts Component
 *
 * Displays recommended/related products
 */
import {Suspense} from 'react';
import {Await} from 'react-router';
import {ProductItem} from '~/components/ProductItem';
import type {RecommendedProductFragment} from 'storefrontapi.generated';

type RelatedProduct = RecommendedProductFragment;

interface RelatedProductsProps {
  products: Promise<RelatedProduct[] | null> | RelatedProduct[] | null;
}

export function RelatedProducts({products}: RelatedProductsProps) {
  // Handle both promise and direct array
  if (products instanceof Promise) {
    return (
      <section className="related-products-section">
        <div className="related-products-container">
          <div className="related-products-header">
            <h2>You May Also Like</h2>
            <p>Complete your project with these complementary products</p>
          </div>
          <Suspense fallback={<RelatedProductsSkeleton />}>
            <Await resolve={products}>
              {(resolvedProducts) => (
                <RelatedProductsGrid products={resolvedProducts} />
              )}
            </Await>
          </Suspense>
        </div>
      </section>
    );
  }

  return (
    <section className="related-products-section">
      <div className="related-products-container">
        <div className="related-products-header">
          <h2>You May Also Like</h2>
          <p>Complete your project with these complementary products</p>
        </div>
        <RelatedProductsGrid products={products} />
      </div>
    </section>
  );
}

function RelatedProductsGrid({products}: {products: RelatedProduct[] | null}) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="related-products-grid">
      {products.slice(0, 4).map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

function RelatedProductsSkeleton() {
  return (
    <div className="related-products-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="related-product-skeleton">
          <div className="skeleton-image" />
          <div className="skeleton-title" />
          <div className="skeleton-price" />
        </div>
      ))}
    </div>
  );
}
