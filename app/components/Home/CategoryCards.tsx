/**
 * CategoryCards Component
 *
 * Displays category cards for different turf applications
 */
import {NavLink} from 'react-router';

const CATEGORIES = [
  {
    title: 'Commercial',
    image: '/commercial.avif',
    href: '/products#specialty',
    description: 'Office buildings, retail spaces & commercial properties',
  },
  {
    title: 'Golf',
    image: '/golf.avif',
    href: '/products#putting-greens',
    description: 'Putting greens & golf practice areas',
  },
  {
    title: 'Pets',
    image: '/pets.avif',
    href: '/products#standard',
    description: 'Pet-friendly turf for dogs & animals',
  },
  {
    title: 'Residential',
    image: '/residential.avif',
    href: '/products#specialty',
    description: 'Lawns, backyards & home landscapes',
  },
];

export function CategoryCards() {
  return (
    <section className="category-cards-section">
      <div className="category-cards-container">
        <div className="category-cards-header">
          <h2>Shop by Application</h2>
          <p>Find the perfect turf for your project</p>
        </div>
        <div className="category-cards-grid">
          {CATEGORIES.map((category) => (
            <NavLink
              key={category.title}
              to={category.href}
              className="category-card"
              prefetch="intent"
            >
              <div className="category-card-image">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                />
                <div className="category-card-overlay" />
              </div>
              <div className="category-card-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="category-card-cta">
                  Shop Now
                  <ArrowIcon />
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
