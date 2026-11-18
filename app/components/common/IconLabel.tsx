/**
 * IconLabel Component
 *
 * Accessibility-compliant component that ensures status/information
 * is never conveyed by color alone (deuteranopia-safe per WCAG 2.1).
 * Always uses Icon + Label + Color for maximum accessibility.
 */
import type {ReactNode} from 'react';

interface IconLabelProps {
  icon: ReactNode;
  label: string;
  className?: string;
  /** Visual variant - never rely on color alone */
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const variantStyles: Record<NonNullable<IconLabelProps['variant']>, string> = {
  default: 'text-neutral-700',
  success: 'text-green-700',
  warning: 'text-amber-700',
  error: 'text-red-700',
};

export function IconLabel({
  icon,
  label,
  className = '',
  variant = 'default',
}: IconLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${variantStyles[variant]} ${className}`}
      role="status"
      aria-label={label}
    >
      <span className="flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
    </span>
  );
}

/**
 * Stock status component - demonstrates the Icon + Label + Color pattern
 */
interface StockStatusProps {
  inStock: boolean;
  quantity?: number;
}

export function StockStatus({inStock, quantity}: StockStatusProps) {
  if (inStock) {
    return (
      <IconLabel
        icon={
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
        label={quantity ? `In Stock (${quantity})` : 'In Stock'}
        variant="success"
      />
    );
  }

  return (
    <IconLabel
      icon={
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      }
      label="Out of Stock"
      variant="error"
    />
  );
}
