/**
 * ProductTabs Component
 *
 * Tabbed content area with:
 * - Description
 * - Specifications (dynamic based on product)
 * - Warranty
 * - Installation
 */
import {useState} from 'react';
import {getProductSpecs, getProductData, type ProductSpec} from '~/data/products';

interface ProductTabsProps {
  description: string;
  handle: string;
  specs?: ProductSpec[];
}

const DEFAULT_SPECS: ProductSpec[] = [
  {label: 'Total Weight', value: '80 oz/sq yd'},
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
];

function getWarrantyContent(warrantyYears: string): string {
  return `
<h3>${warrantyYears} Manufacturer Warranty</h3>
<p>Our industry-leading warranty covers:</p>
<ul>
  <li><strong>UV Degradation:</strong> Protected against fading and fiber breakdown from sun exposure</li>
  <li><strong>Fiber Loss:</strong> Guaranteed minimal shedding under normal use</li>
  <li><strong>Color Fastness:</strong> Colors will remain vibrant throughout the warranty period</li>
  <li><strong>Backing Integrity:</strong> Backing will remain intact and functional</li>
</ul>
<h4>What's Not Covered</h4>
<ul>
  <li>Damage from improper installation</li>
  <li>Chemical damage (harsh cleaners, gasoline, etc.)</li>
  <li>Fire or heat damage</li>
  <li>Intentional damage or abuse</li>
  <li>Acts of nature (floods, hurricanes, etc.)</li>
</ul>
<p><strong>To file a warranty claim:</strong> Contact our support team with your order number and photos of the issue. Claims are typically processed within 5-7 business days.</p>
`;
}

const INSTALLATION_CONTENT = `
<h3>Installation Overview</h3>
<p>Professional installation is recommended for best results, but DIY installation is possible with proper preparation.</p>

<h4>Required Materials</h4>
<ul>
  <li>Base material (decomposed granite or crushed stone)</li>
  <li>Weed barrier fabric</li>
  <li>Seaming tape and adhesive</li>
  <li>6" landscape spikes or staples</li>
  <li>Infill material (optional but recommended)</li>
</ul>

<h4>Basic Steps</h4>
<ol>
  <li><strong>Site Prep:</strong> Remove existing grass, grade the area for drainage (1-2% slope)</li>
  <li><strong>Base Layer:</strong> Add 2-3" of compacted base material</li>
  <li><strong>Weed Barrier:</strong> Roll out and secure weed barrier fabric</li>
  <li><strong>Turf Layout:</strong> Roll out turf, let it acclimate for 1-2 hours</li>
  <li><strong>Cutting:</strong> Cut turf to fit using a sharp utility knife</li>
  <li><strong>Seaming:</strong> Join pieces using seaming tape and adhesive</li>
  <li><strong>Securing:</strong> Nail perimeter every 4-6 inches</li>
  <li><strong>Infill:</strong> Apply infill and brush fibers upright</li>
</ol>

<p><strong>Need help?</strong> Contact us for installer recommendations in your area.</p>
`;

type TabId = 'description' | 'specifications' | 'warranty' | 'installation';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  {id: 'description', label: 'Description', icon: <DescriptionIcon />},
  {id: 'specifications', label: 'Specifications', icon: <SpecsIcon />},
  {id: 'warranty', label: 'Warranty', icon: <WarrantyIcon />},
  {id: 'installation', label: 'Installation', icon: <InstallIcon />},
];

export function ProductTabs({description, handle, specs}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('description');

  // Get product-specific data
  const productData = getProductData(handle);
  const productSpecs = specs || (productData?.specs) || getProductSpecs(handle) || DEFAULT_SPECS;

  // Get warranty years from specs
  const warrantySpec = productSpecs.find((s) => s.label === 'Warranty');
  const warrantyYears = warrantySpec?.value || '15-Year';
  const warrantyContent = getWarrantyContent(warrantyYears);

  // Build enhanced description with product features if available
  let enhancedDescription = description;
  if (productData && (!description || description.length < 100)) {
    enhancedDescription = `
      <p>${productData.description}</p>
      ${productData.features?.length ? `
        <h4>Key Features</h4>
        <ul>
          ${productData.features.map((f) => `<li>${f}</li>`).join('')}
        </ul>
      ` : ''}
      ${productData.bestFor?.length ? `
        <h4>Best For</h4>
        <ul>
          ${productData.bestFor.map((b) => `<li>${b}</li>`).join('')}
        </ul>
      ` : ''}
      ${description ? `<div>${description}</div>` : ''}
    `;
  }

  return (
    <div className="product-tabs">
      <div className="product-tabs-container">
        {/* Tab Navigation */}
        <div className="product-tabs-nav" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`product-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="product-tabs-content">
          {/* Description Panel */}
          <div
            className={`product-tab-panel ${activeTab === 'description' ? 'active' : ''}`}
            role="tabpanel"
            id="panel-description"
            aria-labelledby="tab-description"
            hidden={activeTab !== 'description'}
          >
            <div
              className="product-description-content"
              dangerouslySetInnerHTML={{__html: enhancedDescription}}
            />
          </div>

          {/* Specifications Panel */}
          <div
            className={`product-tab-panel ${activeTab === 'specifications' ? 'active' : ''}`}
            role="tabpanel"
            id="panel-specifications"
            aria-labelledby="tab-specifications"
            hidden={activeTab !== 'specifications'}
          >
            <div className="product-specs-table">
              <table>
                <tbody>
                  {productSpecs.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                      <th scope="row">{spec.label}</th>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Warranty Panel */}
          <div
            className={`product-tab-panel ${activeTab === 'warranty' ? 'active' : ''}`}
            role="tabpanel"
            id="panel-warranty"
            aria-labelledby="tab-warranty"
            hidden={activeTab !== 'warranty'}
          >
            <div
              className="product-warranty-content"
              dangerouslySetInnerHTML={{__html: warrantyContent}}
            />
          </div>

          {/* Installation Panel */}
          <div
            className={`product-tab-panel ${activeTab === 'installation' ? 'active' : ''}`}
            role="tabpanel"
            id="panel-installation"
            aria-labelledby="tab-installation"
            hidden={activeTab !== 'installation'}
          >
            <div
              className="product-installation-content"
              dangerouslySetInnerHTML={{__html: INSTALLATION_CONTENT}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Icons */
function DescriptionIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function SpecsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function InstallIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
