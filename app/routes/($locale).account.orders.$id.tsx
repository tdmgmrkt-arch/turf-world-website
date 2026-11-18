import {redirect, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/account.orders.$id';
import {Money, Image} from '@shopify/hydrogen';
import type {
  OrderLineItemFullFragment,
  OrderQuery,
} from 'customer-accountapi.generated';
import {CUSTOMER_ORDER_QUERY} from '~/graphql/customer-account/CustomerOrderQuery';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Order ${data?.order?.name} | My Account`}];
};

export async function loader({params, context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const {data, errors}: {data: OrderQuery; errors?: Array<{message: string}>} =
    await customerAccount.query(CUSTOMER_ORDER_QUERY, {
      variables: {
        orderId,
        language: customerAccount.i18n.language,
      },
    });

  if (errors?.length || !data?.order) {
    throw new Error('Order not found');
  }

  const {order} = data;

  // Extract line items directly from nodes array
  const lineItems = order.lineItems.nodes;

  // Extract discount applications directly from nodes array
  const discountApplications = order.discountApplications.nodes;

  // Get fulfillment status from first fulfillment node
  const fulfillmentStatus = order.fulfillments.nodes[0]?.status ?? 'N/A';

  // Get first discount value with proper type checking
  const firstDiscount = discountApplications[0]?.value;

  // Type guard for MoneyV2 discount
  const discountValue =
    firstDiscount?.__typename === 'MoneyV2'
      ? (firstDiscount as Extract<
          typeof firstDiscount,
          {__typename: 'MoneyV2'}
        >)
      : null;

  // Type guard for percentage discount
  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue'
      ? (
          firstDiscount as Extract<
            typeof firstDiscount,
            {__typename: 'PricingPercentageValue'}
          >
        ).percentage
      : null;

  return {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  };
}

export default function OrderRoute() {
  const {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus,
  } = useLoaderData<typeof loader>();

  const orderDate = new Date(order.processedAt!);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('fulfilled') || statusLower.includes('delivered') || statusLower.includes('paid')) return 'success';
    if (statusLower.includes('pending') || statusLower.includes('processing')) return 'warning';
    if (statusLower.includes('cancelled') || statusLower.includes('refund')) return 'error';
    return 'default';
  };

  return (
    <div className="order-detail">
      {/* Back Link */}
      <Link to="/account/orders" className="order-detail-back">
        <BackIcon />
        <span>Back to Orders</span>
      </Link>

      {/* Order Header */}
      <div className="order-detail-header">
        <div className="order-detail-header-main">
          <h2 className="order-detail-title">Order {order.name}</h2>
          <p className="order-detail-date">{formattedDate}</p>
          {order.confirmationNumber && (
            <p className="order-detail-confirmation">
              Confirmation: <strong>{order.confirmationNumber}</strong>
            </p>
          )}
        </div>

        <div className="order-detail-statuses">
          <div className={`order-detail-status order-status-${getStatusColor(order.financialStatus || '')}`}>
            <PaymentIcon />
            <span>{formatStatus(order.financialStatus || 'Unknown')}</span>
          </div>
          <div className={`order-detail-status order-status-${getStatusColor(fulfillmentStatus)}`}>
            <TruckIcon />
            <span>{formatStatus(fulfillmentStatus)}</span>
          </div>
        </div>
      </div>

      {/* Order Content */}
      <div className="order-detail-content">
        {/* Line Items */}
        <div className="order-detail-items">
          <h3 className="order-section-title">
            <BoxIcon />
            Items Ordered
          </h3>
          <div className="order-items-list">
            {lineItems.map((lineItem, lineItemIndex) => (
              <OrderLineItem key={lineItemIndex} lineItem={lineItem} />
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-detail-sidebar">
          {/* Order Summary */}
          <div className="order-summary-card">
            <h3 className="order-section-title">
              <ReceiptIcon />
              Order Summary
            </h3>
            <div className="order-summary-rows">
              {((discountValue && discountValue.amount) || discountPercentage) && (
                <div className="order-summary-row discount">
                  <span>Discount</span>
                  <span className="discount-value">
                    {discountPercentage ? (
                      `-${discountPercentage}%`
                    ) : (
                      discountValue && <>-<Money data={discountValue} /></>
                    )}
                  </span>
                </div>
              )}
              <div className="order-summary-row">
                <span>Subtotal</span>
                <span><Money data={order.subtotal!} /></span>
              </div>
              <div className="order-summary-row">
                <span>Tax</span>
                <span><Money data={order.totalTax!} /></span>
              </div>
              <div className="order-summary-row total">
                <span>Total</span>
                <span><Money data={order.totalPrice!} /></span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="order-address-card">
            <h3 className="order-section-title">
              <LocationIcon />
              Shipping Address
            </h3>
            {order?.shippingAddress ? (
              <address className="order-address">
                <p className="address-name">{order.shippingAddress.name}</p>
                {order.shippingAddress.formatted && (
                  <p className="address-line">{order.shippingAddress.formatted}</p>
                )}
                {order.shippingAddress.formattedArea && (
                  <p className="address-line">{order.shippingAddress.formattedArea}</p>
                )}
              </address>
            ) : (
              <p className="no-address">No shipping address on file</p>
            )}
          </div>

          {/* Actions */}
          <div className="order-actions-card">
            <a
              href={order.statusPageUrl}
              target="_blank"
              rel="noreferrer"
              className="order-action-btn primary"
            >
              <ExternalIcon />
              <span>Track Shipment</span>
            </a>
            <Link to="/contact" className="order-action-btn secondary">
              <SupportIcon />
              <span>Need Help?</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderLineItem({lineItem}: {lineItem: OrderLineItemFullFragment}) {
  return (
    <div className="order-line-item">
      <div className="order-line-image">
        {lineItem?.image ? (
          <Image data={lineItem.image} width={100} height={100} />
        ) : (
          <div className="order-line-placeholder">
            <PlaceholderIcon />
          </div>
        )}
      </div>
      <div className="order-line-details">
        <h4 className="order-line-title">{lineItem.title}</h4>
        {lineItem.variantTitle && (
          <p className="order-line-variant">{lineItem.variantTitle}</p>
        )}
        <p className="order-line-qty">Qty: {lineItem.quantity}</p>
      </div>
      <div className="order-line-price">
        <Money data={lineItem.price!} />
        <span className="price-each">each</span>
      </div>
    </div>
  );
}

function formatStatus(status: string): string {
  return status
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* Icons */
function BackIcon() {
  return (
    <svg className="icon-back" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg className="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function PlaceholderIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
