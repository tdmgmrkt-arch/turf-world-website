/**
 * QuantityCalculator Component
 *
 * Calculate turf quantity based on:
 * - Square footage (length x width)
 * - Auto-calculate rolls needed
 * - Price per sq ft display
 * - Quantity stepper
 */
import {useState, useMemo} from 'react';
import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

interface QuantityCalculatorProps {
  price?: MoneyV2;
  rollSqFt?: number; // Square feet per roll (default 750 for 15ft x 50ft)
  onQuantityChange: (quantity: number) => void;
  quantity: number;
}

export function QuantityCalculator({
  price,
  rollSqFt = 750,
  onQuantityChange,
  quantity,
}: QuantityCalculatorProps) {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [showCalculator, setShowCalculator] = useState(false);

  const calculatedSqFt = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    return l * w;
  }, [length, width]);

  const recommendedRolls = useMemo(() => {
    if (calculatedSqFt === 0) return 0;
    // Add 10% for cuts and waste
    const sqFtWithWaste = calculatedSqFt * 1.1;
    return Math.ceil(sqFtWithWaste / rollSqFt);
  }, [calculatedSqFt, rollSqFt]);

  const pricePerSqFt = useMemo(() => {
    if (!price) return 0;
    return parseFloat(price.amount) / rollSqFt;
  }, [price, rollSqFt]);

  const totalPrice = useMemo(() => {
    if (!price) return 0;
    return parseFloat(price.amount) * quantity;
  }, [price, quantity]);

  const totalSqFt = quantity * rollSqFt;

  const handleApplyCalculation = () => {
    if (recommendedRolls > 0) {
      onQuantityChange(recommendedRolls);
    }
  };

  return (
    <div className="quantity-calculator">
      {/* Calculator Toggle */}
      <button
        type="button"
        className="calculator-toggle"
        onClick={() => setShowCalculator(!showCalculator)}
        aria-expanded={showCalculator}
      >
        <CalculatorIcon />
        <span>Calculate How Much You Need</span>
        <ChevronIcon isOpen={showCalculator} />
      </button>

      {/* Calculator Panel */}
      {showCalculator && (
        <div className="calculator-panel">
          <div className="calculator-inputs">
            <div className="calculator-input-group">
              <label htmlFor="calc-length">Length (ft)</label>
              <input
                id="calc-length"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <span className="calculator-multiply">×</span>
            <div className="calculator-input-group">
              <label htmlFor="calc-width">Width (ft)</label>
              <input
                id="calc-width"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <span className="calculator-equals">=</span>
            <div className="calculator-result">
              <span className="calculator-result-value">{calculatedSqFt.toLocaleString()}</span>
              <span className="calculator-result-unit">sq ft</span>
            </div>
          </div>

          {calculatedSqFt > 0 && (
            <div className="calculator-recommendation">
              <div className="recommendation-info">
                <InfoIcon />
                <p>
                  For <strong>{calculatedSqFt.toLocaleString()} sq ft</strong> (+ 10% for cuts),
                  you need approximately <strong>{recommendedRolls} roll{recommendedRolls !== 1 ? 's' : ''}</strong>.
                </p>
              </div>
              <button
                type="button"
                className="recommendation-apply"
                onClick={handleApplyCalculation}
              >
                Apply to Order
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quantity Stepper */}
      <div className="quantity-stepper-section">
        <div className="quantity-stepper-header">
          <label>Quantity</label>
          <span className="quantity-coverage">{totalSqFt.toLocaleString()} sq ft coverage</span>
        </div>

        <div className="quantity-stepper">
          <button
            type="button"
            className="quantity-btn quantity-btn-minus"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <MinusIcon />
          </button>

          <input
            type="number"
            className="quantity-input"
            value={quantity}
            min="1"
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1) {
                onQuantityChange(val);
              }
            }}
            aria-label="Quantity"
          />

          <button
            type="button"
            className="quantity-btn quantity-btn-plus"
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {/* Price Summary */}
      <div className="quantity-price-summary">
        <div className="price-line">
          <span>Price per sq ft</span>
          <span>${pricePerSqFt.toFixed(2)}</span>
        </div>
        <div className="price-line">
          <span>Coverage</span>
          <span>{totalSqFt.toLocaleString()} sq ft</span>
        </div>
        <div className="price-line price-total">
          <span>Total</span>
          <span className="total-amount">
            {price && <Money data={{...price, amount: totalPrice.toString()}} />}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Icons */
function CalculatorIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function ChevronIcon({isOpen}: {isOpen: boolean}) {
  return (
    <svg
      className={`w-5 h-5 chevron-icon ${isOpen ? 'open' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
