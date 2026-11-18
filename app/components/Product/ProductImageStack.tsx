/**
 * ProductImageStack Component
 *
 * Editorial Grid layout for product images:
 * - First image: Full-width hero
 * - Images 2-5: Two per row grid
 * - Mobile: Horizontal swipe slider
 */
import {useState, useRef} from 'react';
import {Image} from '@shopify/hydrogen';

interface ProductImage {
  id?: string;
  url: string;
  altText?: string | null;
  width?: number;
  height?: number;
}

interface ProductImageStackProps {
  images: ProductImage[];
  productTitle: string;
}

const MAX_VISIBLE_IMAGES = 5;

export function ProductImageStack({images, productTitle}: ProductImageStackProps) {
  const [showAll, setShowAll] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) {
    return (
      <div className="image-grid-empty">
        <EmptyImageIcon />
        <p>No images available</p>
      </div>
    );
  }

  const visibleImages = showAll ? images : images.slice(0, MAX_VISIBLE_IMAGES);
  const hasMoreImages = images.length > MAX_VISIBLE_IMAGES;

  // Handle mobile slider scroll
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const slideWidth = sliderRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);
      setActiveSlide(newIndex);
    }
  };

  return (
    <>
      {/* Desktop: Editorial Grid */}
      <div className="image-editorial-grid">
        {visibleImages.map((image, index) => (
          <div
            key={image.id || index}
            className={`image-grid-item ${index === 0 ? 'hero' : 'secondary'}`}
          >
            <Image
              data={image}
              alt={image.altText || `${productTitle} - Image ${index + 1}`}
              className="image-grid-img"
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes={index === 0 ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 29vw, 50vw'}
            />
          </div>
        ))}

        {/* View More Button */}
        {hasMoreImages && !showAll && (
          <button
            className="image-grid-more"
            onClick={() => setShowAll(true)}
            type="button"
          >
            <span>+{images.length - MAX_VISIBLE_IMAGES}</span>
            <span>View More</span>
          </button>
        )}
      </div>

      {/* Mobile: Swipe Slider */}
      <div className="image-mobile-slider">
        <div
          ref={sliderRef}
          className="image-slider-track"
          onScroll={handleScroll}
        >
          {images.map((image, index) => (
            <div key={image.id || index} className="image-slider-slide">
              <Image
                data={image}
                alt={image.altText || `${productTitle} - Image ${index + 1}`}
                className="image-slider-img"
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="image-slider-dots">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`image-slider-dot ${index === activeSlide ? 'active' : ''}`}
                onClick={() => {
                  sliderRef.current?.scrollTo({
                    left: index * (sliderRef.current?.offsetWidth || 0),
                    behavior: 'smooth',
                  });
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function EmptyImageIcon() {
  return (
    <svg
      className="empty-image-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
