import {
  data as remixData,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from 'react-router';
import type {Route} from './+types/account';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const {data, errors} = await customerAccount.query(CUSTOMER_DETAILS_QUERY, {
    variables: {
      language: customerAccount.i18n.language,
    },
  });

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const firstName = customer?.firstName || '';
  const lastName = customer?.lastName || '';
  const email = customer?.email || '';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';

  return (
    <div className="account-page">
      {/* Account Header */}
      <header className="account-header">
        <div className="account-header-content">
          <div className="account-avatar">
            <span>{initials}</span>
          </div>
          <div className="account-header-info">
            <h1 className="account-header-name">
              {firstName ? `Welcome back, ${firstName}` : 'My Account'}
            </h1>
            {email && <p className="account-header-email">{email}</p>}
          </div>
        </div>
      </header>

      {/* Account Navigation */}
      <nav className="account-nav">
        <div className="account-nav-inner">
          <NavLink
            to="/account/orders"
            className={({isActive}) => `account-nav-link ${isActive ? 'active' : ''}`}
          >
            <OrdersIcon />
            <span>Orders</span>
          </NavLink>
          <NavLink
            to="/account/profile"
            className={({isActive}) => `account-nav-link ${isActive ? 'active' : ''}`}
          >
            <ProfileIcon />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to="/account/addresses"
            className={({isActive}) => `account-nav-link ${isActive ? 'active' : ''}`}
          >
            <AddressIcon />
            <span>Addresses</span>
          </NavLink>
          <Form method="POST" action="/account/logout" className="account-nav-logout">
            <button type="submit" className="account-nav-link logout-btn">
              <LogoutIcon />
              <span>Sign Out</span>
            </button>
          </Form>
        </div>
      </nav>

      {/* Account Content */}
      <main className="account-content">
        <div className="account-content-inner">
          <Outlet context={{customer}} />
        </div>
      </main>
    </div>
  );
}

/* Icons */
function OrdersIcon() {
  return (
    <svg className="account-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg className="account-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function AddressIcon() {
  return (
    <svg className="account-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="account-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}
