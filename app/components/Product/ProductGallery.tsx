/**
 * ProductGallery Component
 *
 * Premium image gallery with:
 * - Main image display with zoom on hover
 * - Thumbnail navigation
 * - Lightbox modal for full-screen viewing
 */
import {useState, useCallback} from 'react';
import {Image} from '@shopify/hydrogen';
import type {ProductVariantFragment} from 'storefrontapi.generated';

interface GalleryImage {
  id: string;
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  selectedVariantImage?: ProductVariantFragment['image'];
}

export function ProductGallery({images, selectedVariantImage}: ProductGalleryProps) {
  // Find index of variant image in gallery, or default to 0
  const variantImageIndex = selectedVariantImage
    ? images.findIndex((img) => img.id === selectedVariantImage.id)
    : 0;

  const [selectedIndex, setSelectedIndex] = useState(
    variantImageIndex >= 0 ? variantImageIndex : 0,
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({x: 50, y: 50});
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentImage = images[selectedIndex] || images[0];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomPosition({x, y});
    },
    [isZoomed],
  );

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) {
    return (
      <div className="product-gallery">
        <div className="product-gallery-main product-gallery-empty">
          <PlaceholderIcon />
          <span>No image available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      {/* Main Image Container */}
      <div className="product-gallery-main-wrapper">
        <div
          className={`product-gallery-main ${isZoomed ? 'zoomed' : ''}`}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Click to open full-screen view"
        >
          {currentImage && (
            <>
              <Image
                data={currentImage}
                className="product-gallery-image"
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="eager"
              />
              {isZoomed && (
                <div
                  className="product-gallery-zoom"
                  style={{
                    backgroundImage: `url(${currentImage.url})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              )}
            </>
          )}

          {/* Zoom hint */}
          <div className="product-gallery-zoom-hint">
            <ZoomIcon />
            <span>Hover to zoom</span>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className="product-gallery-nav product-gallery-nav-prev"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="product-gallery-nav product-gallery-nav-next"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="product-gallery-thumbnails">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`product-gallery-thumbnail ${
                index === selectedIndex ? 'active' : ''
              }`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex}
            >
              <Image
                data={image}
                width={80}
                height={80}
                className="product-gallery-thumbnail-image"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="product-gallery-lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen image view"
        >
          <button
            className="product-gallery-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <CloseIcon />
          </button>

          <div
            className="product-gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                className="product-gallery-lightbox-nav lightbox-prev"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeftIcon />
              </button>
            )}

            <img
              src={currentImage.url}
              alt={currentImage.altText || 'Product image'}
              className="product-gallery-lightbox-image"
            />

            {images.length > 1 && (
              <button
                className="product-gallery-lightbox-nav lightbox-next"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRightIcon />
              </button>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          {images.length > 1 && (
            <div className="product-gallery-lightbox-thumbnails">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={`lightbox-thumbnail ${
                    index === selectedIndex ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index + 1}`}
                    width={60}
                    height={60}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="product-gallery-lightbox-counter">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}

/* Icons */
function ZoomIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function PlaceholderIcon() {
  return (
    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
