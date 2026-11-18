/**
 * Product Specifications Data
 *
 * Complete specifications for all turf products.
 * This data is used to display product specs on the product detail page.
 *
 * To add a new product:
 * 1. Add the product to Shopify with a handle matching the key below
 * 2. The specs will automatically display on the product page
 */

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductData {
  name: string;
  category: 'specialty' | 'standard' | 'putting-green';
  description: string;
  image: string; // Path to product image
  specs: ProductSpec[];
  features: string[];
  bestFor: string[];
  rollSqFt: number; // Square feet per roll for calculator
}

/**
 * Product specifications indexed by Shopify product handle
 * Handle format: lowercase with hyphens (e.g., "winter-breeze-68")
 */
export const PRODUCT_DATA: Record<string, ProductData> = {
  /* ============================================
     SPECIALTY PRODUCTS
     ============================================ */

  'winter-breeze-68': {
    name: 'Winter Breeze 68',
    category: 'specialty',
    description:
      'A versatile turf featuring our signature Mini Wave yarn shape for exceptional durability and realistic appearance. Perfect for residential landscapes with moderate traffic.',
    image: '/products/Winter Breeze 68.avif',
    specs: [
      {label: 'Total Weight', value: '68 oz/sq yd'},
      {label: 'Pile Height', value: '1.25"'},
      {label: 'Yarn Shape', value: 'Mini Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '16 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Mini Wave yarn for natural movement',
      'C8 commercial-grade quality',
      '16-year manufacturer warranty',
      'Heat and frost resistant',
    ],
    bestFor: ['Residential lawns', 'Moderate traffic areas', 'Year-round climates'],
    rollSqFt: 1500,
  },

  'bermuda-59': {
    name: 'Bermuda 59',
    category: 'specialty',
    description:
      'Designed for moderate-traffic residential landscapes with excellent heat and frost resistance. A budget-friendly option without compromising on quality.',
    image: '/products/Bermuda 59.avif',
    specs: [
      {label: 'Total Weight', value: '59 oz/sq yd'},
      {label: 'Pile Height', value: '1.25"'},
      {label: 'Yarn Shape', value: 'C Shape'},
      {label: 'Yarn Quality', value: 'C4 Grade'},
      {label: 'Color', value: 'Lime'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'PP Fabric + Mesh'},
      {label: 'Warranty', value: '12 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Budget-friendly option',
      'C-shape yarn for resilience',
      'UV stabilized for color retention',
      'Mesh backing for drainage',
    ],
    bestFor: ['Budget-conscious projects', 'Moderate traffic areas', 'Residential landscapes'],
    rollSqFt: 1500,
  },

  'olive-59': {
    name: 'Olive 59',
    category: 'specialty',
    description:
      'A dual-colored olive blend perfect for moderate traffic areas. The natural olive tones create a realistic, mature lawn appearance.',
    image: '/products/olive-59.avif',
    specs: [
      {label: 'Total Weight', value: '59 oz/sq yd'},
      {label: 'Pile Height', value: '1.25"'},
      {label: 'Yarn Shape', value: 'C Shape'},
      {label: 'Yarn Quality', value: 'C4 Grade'},
      {label: 'Color', value: 'Olive'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'PP Fabric + Mesh'},
      {label: 'Warranty', value: '12 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Dual-colored olive blend',
      'Natural, mature lawn look',
      'UV stabilized',
      'Budget-friendly',
    ],
    bestFor: ['Natural appearance', 'Moderate traffic', 'Residential landscapes'],
    rollSqFt: 1500,
  },

  'bermuda-87': {
    name: 'Bermuda 87',
    category: 'specialty',
    description:
      'Plush turf with a higher pile for high-traffic use. The C8 commercial-grade yarn ensures exceptional durability and long-lasting beauty.',
    image: '/products/bermuda-87.avif',
    specs: [
      {label: 'Total Weight', value: '87 oz/sq yd'},
      {label: 'Pile Height', value: '1.75"'},
      {label: 'Yarn Shape', value: 'C Shape'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Lime'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '16 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Plush 1.75" pile height',
      'C8 commercial-grade quality',
      '16-year warranty',
      'High-traffic durability',
    ],
    bestFor: ['High-traffic areas', 'Play areas', 'Premium residential'],
    rollSqFt: 1500,
  },

  'bermuda-93': {
    name: 'Bermuda 93',
    category: 'specialty',
    description:
      'Dense and vibrant lime-colored turf with our premium Wave yarn shape. The extra pile height provides a luxurious feel underfoot.',
    image: '/products/Bermuda 93.avif',
    specs: [
      {label: 'Total Weight', value: '93 oz/sq yd'},
      {label: 'Pile Height', value: '1.97"'},
      {label: 'Yarn Shape', value: 'Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Lime'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '16 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Dense, vibrant appearance',
      'Wave yarn for natural look',
      'Nearly 2" pile height',
      'Premium feel underfoot',
    ],
    bestFor: ['Premium landscapes', 'Luxury residential', 'High-visibility areas'],
    rollSqFt: 1500,
  },

  'winter-breeze-77': {
    name: 'Winter Breeze 77',
    category: 'specialty',
    description:
      'Bright-colored turf with wave-blade technology and medium pile height. A perfect balance of durability and aesthetics.',
    image: '/products/Winter Breeze 77.avif',
    specs: [
      {label: 'Total Weight', value: '77 oz/sq yd'},
      {label: 'Pile Height', value: '1.58"'},
      {label: 'Yarn Shape', value: 'Mini Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '16 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Mini Wave yarn technology',
      'Medium pile for versatility',
      'Bright field green color',
      'C8 commercial grade',
    ],
    bestFor: ['General landscaping', 'Residential lawns', 'Pet areas'],
    rollSqFt: 1500,
  },

  'winter-breeze-108': {
    name: 'Winter Breeze 108',
    category: 'specialty',
    description:
      'Thick, luxurious field-green turf with tan thatch for ultra-realistic appearance. Our heaviest Winter Breeze variant for maximum plushness.',
    image: '/products/winter-breeze-108.avif',
    specs: [
      {label: 'Total Weight', value: '108 oz/sq yd'},
      {label: 'Pile Height', value: '1.75"'},
      {label: 'Yarn Shape', value: 'M Shape'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green with Tan Thatch'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '16 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Ultra-thick 108 oz construction',
      'Tan thatch for realism',
      'M-shape yarn for resilience',
      'Premium luxury feel',
    ],
    bestFor: ['Luxury installations', 'High-end residential', 'Showpiece lawns'],
    rollSqFt: 1500,
  },

  'olive-73': {
    name: 'Olive 73',
    category: 'specialty',
    description:
      'Well-balanced product for residential and commercial use. Low pile with tough Wave blade construction for excellent durability.',
    image: '/products/olive-73.avif',
    specs: [
      {label: 'Total Weight', value: '73 oz/sq yd'},
      {label: 'Pile Height', value: '1.50"'},
      {label: 'Yarn Shape', value: 'Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Olive'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '16 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Versatile residential/commercial use',
      'Wave yarn for durability',
      'Natural olive color',
      'Balanced performance',
    ],
    bestFor: ['Commercial spaces', 'High-traffic residential', 'Multi-use areas'],
    rollSqFt: 1500,
  },

  'olive-92': {
    name: 'Olive 92',
    category: 'specialty',
    description:
      'Plush, natural-looking turf that replicates the appearance of a real, well-maintained lawn. The 2" pile height provides exceptional comfort.',
    image: '/products/Olive 92.png',
    specs: [
      {label: 'Total Weight', value: '92 oz/sq yd'},
      {label: 'Pile Height', value: '2.0"'},
      {label: 'Yarn Shape', value: 'C Shape'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Olive'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '16 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Ultra-plush 2" pile',
      'Realistic lawn replication',
      'Natural olive tones',
      'Premium comfort',
    ],
    bestFor: ['Luxury landscapes', 'Barefoot areas', 'Premium residential'],
    rollSqFt: 1500,
  },

  'natural-93': {
    name: 'Natural 93',
    category: 'specialty',
    description:
      'Tri-colored blend with a plush, natural look. Multiple yarn shapes create depth and dimension for the most realistic appearance possible.',
    image: '/products/Natural 93.avif',
    specs: [
      {label: 'Total Weight', value: '93 oz/sq yd'},
      {label: 'Pile Height', value: '1.75"'},
      {label: 'Yarn Shape', value: 'Wave/D Combination'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Olive/Brown Tri-Color Blend'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '16 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Tri-color blend for realism',
      'Multiple yarn shapes',
      'Natural depth and dimension',
      'Premium appearance',
    ],
    bestFor: ['Ultra-realistic installations', 'Premium residential', 'Showpiece lawns'],
    rollSqFt: 1500,
  },

  'pro-putt': {
    name: 'Pro Putt',
    category: 'putting-green',
    description:
      'Professional-grade putting green surface with consistent ball roll. Stimp speed of approximately 8.5 feet for true putting performance.',
    image: '/products/pro putt.avif',
    specs: [
      {label: 'Total Weight', value: '72 oz/sq yd'},
      {label: 'Pile Height', value: '0.71"'},
      {label: 'Yarn Shape', value: 'Flat Putting Green'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '16 Years'},
      {label: 'Stimp Speed', value: '~8.5 ft'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
    ],
    features: [
      'Professional stimp speed',
      'Consistent ball roll',
      'Flat putting green yarn',
      'True putting performance',
    ],
    bestFor: ['Backyard putting greens', 'Golf practice areas', 'Entertainment spaces'],
    rollSqFt: 1500,
  },

  /* ============================================
     STANDARD PRODUCTS
     ============================================ */

  'california-65': {
    name: 'California 65',
    category: 'standard',
    description:
      'Medium-pile turf perfect for general landscaping applications. A reliable, versatile choice for residential installations.',
    image: '/products/California 65.avif',
    specs: [
      {label: 'Total Weight', value: '65 oz/sq yd'},
      {label: 'Pile Height', value: '1.25"'},
      {label: 'Yarn Shape', value: 'C Shape'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Versatile medium pile',
      'C8 commercial grade',
      '15-year warranty',
      'Great value option',
    ],
    bestFor: ['General landscaping', 'Residential lawns', 'Budget-friendly projects'],
    rollSqFt: 1500,
  },

  'colorado-80': {
    name: 'Colorado 80',
    category: 'standard',
    description:
      'Polyethylene monofilament with integrated thatch for a natural, multi-dimensional appearance. Mini Wave yarn for excellent resilience.',
    image: '/products/Colorado 80.avif',
    specs: [
      {label: 'Total Weight', value: '80 oz/sq yd'},
      {label: 'Pile Height', value: '1.5"'},
      {label: 'Yarn Shape', value: 'Mini Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Integrated thatch layer',
      'Mini Wave yarn',
      'Multi-dimensional look',
      'Excellent resilience',
    ],
    bestFor: ['Residential landscapes', 'Family yards', 'Pet-friendly areas'],
    rollSqFt: 1500,
  },

  'hawaii-80': {
    name: 'Hawaii 80',
    category: 'standard',
    description:
      'Beautiful emerald-colored turf with our unique C&S yarn technology for superior durability and a tropical, vibrant appearance.',
    image: '/products/Hawaii 87.avif',
    specs: [
      {label: 'Total Weight', value: '80 oz/sq yd'},
      {label: 'Pile Height', value: '1.5"'},
      {label: 'Yarn Shape', value: 'C&S'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Emerald'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Vibrant emerald color',
      'C&S yarn technology',
      'Tropical appearance',
      'Superior durability',
    ],
    bestFor: ['Tropical-style landscapes', 'Pool areas', 'Vibrant color preference'],
    rollSqFt: 1500,
  },

  'florida-80': {
    name: 'Florida 80',
    category: 'standard',
    description:
      'Similar performance to Hawaii 80 but with Mini-Wave yarn and field green color. Perfect for those who prefer a classic lawn appearance.',
    image: '/products/Florida 80.avif',
    specs: [
      {label: 'Total Weight', value: '80 oz/sq yd'},
      {label: 'Pile Height', value: '1.5"'},
      {label: 'Yarn Shape', value: 'Mini Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Classic field green',
      'Mini Wave yarn',
      'Traditional lawn look',
      'Excellent durability',
    ],
    bestFor: ['Traditional landscapes', 'Residential lawns', 'Classic appearance'],
    rollSqFt: 1500,
  },

  'hawaii-87': {
    name: 'Hawaii 87',
    category: 'standard',
    description:
      'Taller pile version of our popular Hawaii series. The 1.75" pile height provides extra cushion and a more luxurious feel.',
    image: '/products/Hawaii 87.avif',
    specs: [
      {label: 'Total Weight', value: '87 oz/sq yd'},
      {label: 'Pile Height', value: '1.75"'},
      {label: 'Yarn Shape', value: 'C&S'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Emerald'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Taller 1.75" pile',
      'Luxurious emerald color',
      'Extra cushion underfoot',
      'C&S yarn technology',
    ],
    bestFor: ['Premium landscapes', 'Barefoot areas', 'Pool surrounds'],
    rollSqFt: 1500,
  },

  'idaho-93': {
    name: 'Idaho 93',
    category: 'standard',
    description:
      'High-density turf with Mini-Wave yarn for excellent recovery and durability. A great choice for active families.',
    image: '/products/Natural 90.avif',
    specs: [
      {label: 'Total Weight', value: '93 oz/sq yd'},
      {label: 'Pile Height', value: '1.75"'},
      {label: 'Yarn Shape', value: 'Mini Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'High-density construction',
      'Excellent blade recovery',
      'Family-friendly durability',
      'Natural field green',
    ],
    bestFor: ['Active families', 'Play areas', 'High-traffic yards'],
    rollSqFt: 1500,
  },

  'nevada-95': {
    name: 'Nevada 95',
    category: 'standard',
    description:
      'Dense, resilient turf with classic C-shape yarn for excellent durability. The 1.75" pile provides comfort and visual appeal.',
    image: '/products/Nevada 95.avif',
    specs: [
      {label: 'Total Weight', value: '95 oz/sq yd'},
      {label: 'Pile Height', value: '1.75"'},
      {label: 'Yarn Shape', value: 'C Shape'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Dense 95 oz construction',
      'Classic C-shape yarn',
      'Excellent resilience',
      'Time-tested durability',
    ],
    bestFor: ['General landscaping', 'Residential yards', 'Commercial applications'],
    rollSqFt: 1500,
  },

  'colorado-95': {
    name: 'Colorado 95',
    category: 'standard',
    description:
      'Plush 2" pile turf with Mini-Wave yarn. The extra height creates a luxurious, carpet-like feel perfect for relaxation areas.',
    image: '/products/Colorado 95.avif',
    specs: [
      {label: 'Total Weight', value: '95 oz/sq yd'},
      {label: 'Pile Height', value: '2.0"'},
      {label: 'Yarn Shape', value: 'Mini Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Extra-tall 2" pile',
      'Carpet-like feel',
      'Mini Wave technology',
      'Ultimate comfort',
    ],
    bestFor: ['Relaxation areas', 'Luxury landscapes', 'Barefoot zones'],
    rollSqFt: 1500,
  },

  'hawaii-96': {
    name: 'Hawaii 96',
    category: 'standard',
    description:
      'Our tallest Hawaii variant with a full 2" pile. The emerald color and C&S yarn create a stunning tropical paradise effect.',
    image: '/products/Hawaii 96.avif',
    specs: [
      {label: 'Total Weight', value: '96 oz/sq yd'},
      {label: 'Pile Height', value: '2.0"'},
      {label: 'Yarn Shape', value: 'C&S'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Emerald'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Tallest Hawaii variant',
      'Stunning emerald color',
      'Tropical paradise look',
      'Maximum plushness',
    ],
    bestFor: ['Resort-style landscapes', 'Pool areas', 'Tropical themes'],
    rollSqFt: 1500,
  },

  'kansas-95': {
    name: 'Kansas 95',
    category: 'standard',
    description:
      'Dense, durable turf with 2" pile and Mini-Wave yarn. Built to withstand heavy use while maintaining a beautiful appearance.',
    image: '/products/Kansas 95.avif',
    specs: [
      {label: 'Total Weight', value: '95 oz/sq yd'},
      {label: 'Pile Height', value: '2.0"'},
      {label: 'Yarn Shape', value: 'Mini Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Heavy-duty construction',
      'Tall 2" pile height',
      'Mini Wave resilience',
      'Commercial-grade durability',
    ],
    bestFor: ['Heavy-use areas', 'Commercial spaces', 'Sports and play'],
    rollSqFt: 1500,
  },

  'natural-96': {
    name: 'Natural 96 (Super Realistic 96)',
    category: 'standard',
    description:
      'Multi-toned turf using S-Omega and Diamond yarn shapes for the most realistic appearance. A beautiful blend of field green, olive, and tan.',
    image: '/products/Natural 90.avif',
    specs: [
      {label: 'Total Weight', value: '96 oz/sq yd'},
      {label: 'Pile Height', value: '1.75"'},
      {label: 'Yarn Shape', value: 'S-Omega/Diamond'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green/Olive/Tan Mix'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Multi-toned realism',
      'S-Omega/Diamond yarn',
      'Natural color blend',
      'Premium appearance',
    ],
    bestFor: ['Ultra-realistic installations', 'Premium residential', 'Showcase lawns'],
    rollSqFt: 1500,
  },

  'texas-108': {
    name: 'Texas 108',
    category: 'standard',
    description:
      'Heavy-duty turf with exceptional density. The 108 oz weight and Mini-Wave yarn create a premium, resilient surface.',
    image: '/products/Texas 108.avif',
    specs: [
      {label: 'Total Weight', value: '108 oz/sq yd'},
      {label: 'Pile Height', value: '1.75"'},
      {label: 'Yarn Shape', value: 'Mini Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Heavy 108 oz construction',
      'Exceptional density',
      'Premium resilience',
      'Long-lasting durability',
    ],
    bestFor: ['High-end residential', 'Commercial applications', 'Heavy traffic areas'],
    rollSqFt: 1500,
  },

  'nevada-110': {
    name: 'Nevada 110',
    category: 'standard',
    description:
      'Our tallest standard turf with an impressive 2.3" pile height. The C-shape yarn provides excellent support for the tall blades.',
    image: '/products/Nevada 95.avif',
    specs: [
      {label: 'Total Weight', value: '110 oz/sq yd'},
      {label: 'Pile Height', value: '2.3"'},
      {label: 'Yarn Shape', value: 'C Shape'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Tallest pile at 2.3"',
      'Maximum cushion',
      'Heavy-duty construction',
      'Ultimate luxury feel',
    ],
    bestFor: ['Ultra-luxury installations', 'Statement landscapes', 'Maximum comfort'],
    rollSqFt: 1500,
  },

  'super-realistic-120': {
    name: 'Super Realistic 120',
    category: 'standard',
    description:
      'Premium multi-colored turf using five-color multi-bladed fibers. Our most realistic product with W-Omega and Diamond yarn shapes.',
    image: '/products/Super realistic 120.avif',
    specs: [
      {label: 'Total Weight', value: '120 oz/sq yd'},
      {label: 'Pile Height', value: '2.0"'},
      {label: 'Yarn Shape', value: 'W-Omega/Diamond'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Multi-Colored 5-Tone Blend'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Five-color fiber blend',
      'Most realistic appearance',
      'Premium 120 oz weight',
      'W-Omega/Diamond yarn',
    ],
    bestFor: ['Ultra-premium installations', 'Model homes', 'Showpiece properties'],
    rollSqFt: 1500,
  },

  'texas-130': {
    name: 'Texas 130',
    category: 'standard',
    description:
      'Our heaviest turf at 130 oz for the most lush, luxurious landscapes. Exceptional density for unmatched durability and comfort.',
    image: '/products/Texas 130.avif',
    specs: [
      {label: 'Total Weight', value: '130 oz/sq yd'},
      {label: 'Pile Height', value: '2.0"'},
      {label: 'Yarn Shape', value: 'Mini Wave'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Field Green'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
      {label: 'Drainage', value: '30+ inches/hour'},
    ],
    features: [
      'Heaviest turf at 130 oz',
      'Maximum density',
      'Unmatched durability',
      'Ultimate lush appearance',
    ],
    bestFor: ['Premium estates', 'Commercial showcases', 'Maximum durability needs'],
    rollSqFt: 1500,
  },

  'thousand-pine-putt': {
    name: 'Thousand Pine Putt',
    category: 'putting-green',
    description:
      'Dual emerald and olive textured putting-green turf. High durability rating of 350+ lbs for consistent putting performance.',
    image: '/products/pro putt.avif',
    specs: [
      {label: 'Total Weight', value: '51 oz/sq yd'},
      {label: 'Pile Height', value: '0.59"'},
      {label: 'Durability Rating', value: '350+ lbs'},
      {label: 'Yarn Quality', value: 'C8 Commercial Grade'},
      {label: 'Color', value: 'Olive/Emerald Dual-Tone'},
      {label: 'Roll Size', value: '15 ft × 100 ft (1,500 sq ft)'},
      {label: 'Backing', value: 'Polyethylene'},
      {label: 'Warranty', value: '15 Years'},
      {label: 'UV Stabilized', value: 'Yes'},
      {label: 'Heat/Frost Resistant', value: 'Yes'},
      {label: 'Lead Free', value: 'Yes - 0% Lead Content'},
    ],
    features: [
      'Dual-tone putting surface',
      'High durability rating',
      'Consistent ball roll',
      'Professional appearance',
    ],
    bestFor: ['Putting greens', 'Golf practice', 'Game rooms'],
    rollSqFt: 1500,
  },
};

/**
 * Get product data by handle
 */
export function getProductData(handle: string): ProductData | null {
  return PRODUCT_DATA[handle] || null;
}

/**
 * Get product specs by handle
 */
export function getProductSpecs(handle: string): ProductSpec[] {
  const data = PRODUCT_DATA[handle];
  return data?.specs || [];
}

/**
 * Get roll square footage for calculator
 */
export function getRollSqFt(handle: string): number {
  const data = PRODUCT_DATA[handle];
  return data?.rollSqFt || 1500;
}

/**
 * Get all product handles
 */
export function getAllProductHandles(): string[] {
  return Object.keys(PRODUCT_DATA);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: 'specialty' | 'standard' | 'putting-green'): string[] {
  return Object.entries(PRODUCT_DATA)
    .filter(([_, data]) => data.category === category)
    .map(([handle]) => handle);
}
