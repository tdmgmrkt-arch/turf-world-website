/**
 * ProductOptions Component
 *
 * Enhanced variant selection with:
 * - Visual swatches for colors
 * - Size/dimension selector
 * - Availability indicators
 */
import {Link, useNavigate} from 'react-router';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {Maybe, ProductOptionValueSwatch} from '@shopify/hydrogen/storefront-api-types';

interface ProductOptionsProps {
  productOptions: MappedProductOptions[];
}

export function ProductOptions({productOptions}: ProductOptionsProps) {
  const navigate = useNavigate();

  return (
    <div className="product-options-container">
      {productOptions.map((option) => {
        // Skip single-value options
        if (option.optionValues.length === 1) return null;

        const isColorOption = option.name.toLowerCase().includes('color') ||
          option.name.toLowerCase().includes('style');

        return (
          <div className="product-option-group" key={option.name}>
            <div className="product-option-header">
              <label className="product-option-label">{option.name}</label>
              {option.optionValues.find((v) => v.selected) && (
                <span className="product-option-selected">
                  {option.optionValues.find((v) => v.selected)?.name}
                </span>
              )}
            </div>

            <div className={`product-option-values ${isColorOption ? 'color-swatches' : 'text-options'}`}>
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                const optionClass = `product-option-value ${selected ? 'selected' : ''} ${!available ? 'unavailable' : ''} ${!exists ? 'nonexistent' : ''}`;

                if (isDifferentProduct) {
                  return (
                    <Link
                      key={option.name + name}
                      className={optionClass}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      title={name}
                    >
                      <OptionContent swatch={swatch} name={name} isColor={isColorOption} />
                      {!available && <span className="option-unavailable-line" />}
                    </Link>
                  );
                }

                return (
                  <button
                    key={option.name + name}
                    type="button"
                    className={optionClass}
                    disabled={!exists}
                    title={name}
                    onClick={() => {
                      if (!selected && exists) {
                        navigate(`?${variantUriQuery}`, {
                          replace: true,
                          preventScrollReset: true,
                        });
                      }
                    }}
                  >
                    <OptionContent swatch={swatch} name={name} isColor={isColorOption} />
                    {!available && exists && <span className="option-unavailable-line" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OptionContent({
  swatch,
  name,
  isColor,
}: {
  swatch?: Maybe<ProductOptionValueSwatch>;
  name: string;
  isColor: boolean;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (isColor && (image || color)) {
    return (
      <div className="option-swatch" title={name}>
        {image ? (
          <img src={image} alt={name} className="option-swatch-image" />
        ) : (
          <div
            className="option-swatch-color"
            style={{backgroundColor: color || '#ccc'}}
          />
        )}
        <span className="option-swatch-label">{name}</span>
      </div>
    );
  }

  return <span className="option-text-label">{name}</span>;
}
