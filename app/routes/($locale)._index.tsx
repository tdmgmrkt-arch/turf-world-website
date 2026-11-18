import {Await, useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {
  Hero,
  TrustBadges,
  CategoryCards,
  BuyingExperience,
  WhyChooseUs,
  WarrantyQuality,
  LogisticsMap,
} from '~/components/Home';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Premium Wholesale Artificial Turf | Turf World'},
    {
      name: 'description',
      content:
        'Experience turf like never before. Commercial-grade artificial grass with 16-year warranty, free nationwide shipping, and wholesale-direct pricing.',
    },
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="home">
      {/* Hero Section - Full-width background slideshow */}
      <Hero />

      {/* Trust Badges - Key value propositions */}
      <TrustBadges />

      {/* Category Cards - Shop by Application */}
      <CategoryCards />

      {/* Buying Experience - Speed & Convenience */}
      <BuyingExperience />

      {/* Why Choose Turf World - Trust & Safety */}
      <WhyChooseUs />

      {/* Warranty & Quality - 16yr Warranty, C8 Yarn */}
      <WarrantyQuality />

      {/* Logistics - 48hr Nationwide Shipping */}
      <LogisticsMap />

      {/* Below the fold content */}
      <section className="home-content">
        <RecommendedProducts products={data.recommendedProducts} />
      </section>
    </div>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
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
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
