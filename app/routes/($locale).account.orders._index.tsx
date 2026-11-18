import {
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';
import type {Route} from './+types/account.orders._index';
import {useRef} from 'react';
import {
  Money,
  getPaginationVariables,
  flattenConnection,
} from '@shopify/hydrogen';
import {
  buildOrderSearchQuery,
  parseOrderFilters,
  ORDER_FILTER_FIELDS,
  type OrderFilterParams,
} from '~/lib/orderFilters';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';
import type {
  CustomerOrdersFragment,
  OrderItemFragment,
} from 'customer-accountapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

type OrdersLoaderData = {
  customer: CustomerOrdersFragment;
  filters: OrderFilterParams;
};

export const meta: Route.MetaFunction = () => {
  return [{title: 'Orders | My Account'}];
};

export async function loader({request, context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });

  const url = new URL(request.url);
  const filters = parseOrderFilters(url.searchParams);
  const query = buildOrderSearchQuery(filters);

  const {data, errors} = await customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables,
      query,
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw Error('Customer orders not found');
  }

  return {customer: data.customer, filters};
}

export default function Orders() {
  const {customer, filters} = useLoaderData<OrdersLoaderData>();
  const {orders} = customer;

  return (
    <div className="orders-page">
      {/* Page Header */}
      <div className="orders-page-header">
        <h2 className="orders-page-title">Order History</h2>
        <p className="orders-page-subtitle">
          View and track all your orders
        </p>
      </div>

      {/* Search/Filter */}
      <OrderSearchForm currentFilters={filters} />

      {/* Orders List */}
      <OrdersGrid orders={orders} filters={filters} />
    </div>
  );
}

function OrdersGrid({
  orders,
  filters,
}: {
  orders: CustomerOrdersFragment['orders'];
  filters: OrderFilterParams;
}) {
  const hasFilters = !!(filters.name || filters.confirmationNumber);

  return (
    <div className="orders-grid" aria-live="polite">
      {orders?.nodes.length ? (
        <PaginatedResourceSection connection={orders}>
          {({node: order}) => <OrderCard key={order.id} order={order} />}
        </PaginatedResourceSection>
      ) : (
        <EmptyOrders hasFilters={hasFilters} />
      )}
    </div>
  );
}

function EmptyOrders({hasFilters = false}: {hasFilters?: boolean}) {
  return (
    <div className="orders-empty">
      <div className="orders-empty-icon">
        <EmptyBoxIcon />
      </div>
      {hasFilters ? (
        <>
          <h3>No orders found</h3>
          <p>We couldn't find any orders matching your search criteria.</p>
          <Link to="/account/orders" className="orders-empty-btn">
            Clear Filters
          </Link>
        </>
      ) : (
        <>
          <h3>No orders yet</h3>
          <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
          <Link to="/products" className="orders-empty-btn">
            Browse Products
          </Link>
        </>
      )}
    </div>
  );
}

function OrderSearchForm({
  currentFilters,
}: {
  currentFilters: OrderFilterParams;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSearching =
    navigation.state !== 'idle' &&
    navigation.location?.pathname?.includes('orders');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    const name = formData.get(ORDER_FILTER_FIELDS.NAME)?.toString().trim();
    const confirmationNumber = formData
      .get(ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER)
      ?.toString()
      .trim();

    if (name) params.set(ORDER_FILTER_FIELDS.NAME, name);
    if (confirmationNumber)
      params.set(ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER, confirmationNumber);

    setSearchParams(params);
  };

  const hasFilters = currentFilters.name || currentFilters.confirmationNumber;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="orders-search"
      aria-label="Search orders"
    >
      <div className="orders-search-fields">
        <div className="orders-search-field">
          <SearchIcon />
          <input
            type="search"
            name={ORDER_FILTER_FIELDS.NAME}
            placeholder="Search by order number..."
            aria-label="Order number"
            defaultValue={currentFilters.name || ''}
          />
        </div>
        <div className="orders-search-field">
          <HashIcon />
          <input
            type="search"
            name={ORDER_FILTER_FIELDS.CONFIRMATION_NUMBER}
            placeholder="Confirmation number..."
            aria-label="Confirmation number"
            defaultValue={currentFilters.confirmationNumber || ''}
          />
        </div>
      </div>

      <div className="orders-search-actions">
        <button type="submit" className="orders-search-btn" disabled={isSearching}>
          {isSearching ? (
            <>
              <LoadingSpinner />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <SearchIcon />
              <span>Search</span>
            </>
          )}
        </button>
        {hasFilters && (
          <button
            type="button"
            className="orders-search-clear"
            disabled={isSearching}
            onClick={() => {
              setSearchParams(new URLSearchParams());
              formRef.current?.reset();
            }}
          >
            Clear Filters
          </button>
        )}
      </div>
    </form>
  );
}

function OrderCard({order}: {order: OrderItemFragment}) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;
  const orderDate = new Date(order.processedAt);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Map status to colors
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('fulfilled') || statusLower.includes('delivered')) return 'success';
    if (statusLower.includes('pending') || statusLower.includes('processing')) return 'warning';
    if (statusLower.includes('cancelled') || statusLower.includes('refund')) return 'error';
    return 'default';
  };

  const financialStatusColor = getStatusColor(order.financialStatus || '');
  const fulfillmentStatusColor = fulfillmentStatus ? getStatusColor(fulfillmentStatus) : 'default';

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="order-card-number">
          <span className="order-label">Order</span>
          <span className="order-number">#{order.number}</span>
        </div>
        <div className="order-card-date">{formattedDate}</div>
      </div>

      <div className="order-card-body">
        <div className="order-card-statuses">
          <div className={`order-status order-status-${financialStatusColor}`}>
            <PaymentIcon />
            <span>{formatStatus(order.financialStatus || 'Unknown')}</span>
          </div>
          {fulfillmentStatus && (
            <div className={`order-status order-status-${fulfillmentStatusColor}`}>
              <ShippingIcon />
              <span>{formatStatus(fulfillmentStatus)}</span>
            </div>
          )}
        </div>

        {order.confirmationNumber && (
          <div className="order-card-confirmation">
            <span className="confirmation-label">Confirmation:</span>
            <span className="confirmation-value">{order.confirmationNumber}</span>
          </div>
        )}

        <div className="order-card-total">
          <span className="total-label">Total</span>
          <span className="total-value">
            <Money data={order.totalPrice} />
          </span>
        </div>
      </div>

      <div className="order-card-footer">
        <Link to={`/account/orders/${btoa(order.id)}`} className="order-card-link">
          <span>View Details</span>
          <ArrowRightIcon />
        </Link>
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
function SearchIcon() {
  return (
    <svg className="icon-search" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function HashIcon() {
  return (
    <svg className="icon-hash" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg className="icon-spinner" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

function EmptyBoxIcon() {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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

function ShippingIcon() {
  return (
    <svg className="status-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="icon-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
