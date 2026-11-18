/**
 * ProductAccordions Component
 *
 * Collapsible accordion sections for product details:
 * Description, Specifications, Warranty, Installation
 */
import {useState} from 'react';
import {getProductSpecs, PRODUCT_DATA} from '~/data/products';

interface ProductAccordionsProps {
  description: string;
  handle: string;
}

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionItem({title, isOpen, onToggle, children}: AccordionItemProps) {
  return (
    <div className="product-accordion-item">
      <button
        className="product-accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="product-accordion-title">{title}</span>
        <span className={`product-accordion-icon ${isOpen ? 'open' : ''}`}>
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      <div
        className={`product-accordion-content ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="product-accordion-body">{children}</div>
      </div>
    </div>
  );
}

export function ProductAccordions({description, handle}: ProductAccordionsProps) {
  const [openSection, setOpenSection] = useState<string | null>('description');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Get product specs
  const productSpecs = getProductSpecs(handle);

  // Enhanced description with features
  const enhancedDescription = buildEnhancedDescription(description, handle);

  return (
    <div className="product-accordions">
      {/* Description */}
      <AccordionItem
        title="Description"
        isOpen={openSection === 'description'}
        onToggle={() => toggleSection('description')}
      >
        <div
          className="accordion-description"
          dangerouslySetInnerHTML={{__html: enhancedDescription}}
        />
      </AccordionItem>

      {/* Specifications */}
      <AccordionItem
        title="Specifications"
        isOpen={openSection === 'specifications'}
        onToggle={() => toggleSection('specifications')}
      >
        <div className="accordion-specs">
          <table>
            <tbody>
              {productSpecs.map((spec, index) => (
                <tr key={index}>
                  <th>{spec.label}</th>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AccordionItem>

      {/* Warranty */}
      <AccordionItem
        title="Warranty"
        isOpen={openSection === 'warranty'}
        onToggle={() => toggleSection('warranty')}
      >
        <div className="accordion-warranty">
          <h4>16-Year Limited Warranty</h4>
          <p>
            All Turf World products are backed by our industry-leading 16-year
            limited warranty, covering manufacturing defects and UV degradation.
          </p>
          <ul>
            <li>UV stability guaranteed for 16 years</li>
            <li>No significant fading or fiber degradation</li>
            <li>Covers manufacturing defects</li>
            <li>Transferable to new property owners</li>
          </ul>
          <p className="warranty-note">
            <strong>Note:</strong> Warranty does not cover damage from improper
            installation, abuse, or acts of nature.
          </p>
        </div>
      </AccordionItem>

      {/* Installation */}
      <AccordionItem
        title="Installation Guide"
        isOpen={openSection === 'installation'}
        onToggle={() => toggleSection('installation')}
      >
        <div className="accordion-installation">
          <h4>Professional Installation Recommended</h4>
          <p>For best results, we recommend professional installation. DIY installation is possible with proper preparation.</p>
          <ol>
            <li><strong>Site Prep:</strong> Remove existing grass, level ground</li>
            <li><strong>Base Layer:</strong> Add 3-4" of crushed rock, compact</li>
            <li><strong>Weed Barrier:</strong> Install landscape fabric</li>
            <li><strong>Roll Out Turf:</strong> Unroll, let acclimate 1-2 hours</li>
            <li><strong>Trim & Seam:</strong> Cut to fit, seam multiple pieces</li>
            <li><strong>Secure:</strong> Nail perimeter every 4-6 inches</li>
            <li><strong>Infill:</strong> Apply silica sand or recommended infill</li>
            <li><strong>Brush:</strong> Power broom to stand fibers upright</li>
          </ol>
        </div>
      </AccordionItem>
    </div>
  );
}

function buildEnhancedDescription(description: string, handle: string): string {
  const productData = PRODUCT_DATA[handle];

  let content = '';

  // Add features list if available
  if (productData?.features && productData.features.length > 0) {
    content += '<h4>Key Features</h4><ul>';
    productData.features.forEach((feature: string) => {
      content += `<li>${feature}</li>`;
    });
    content += '</ul>';
  }

  // Add best for section if available
  if (productData?.bestFor && productData.bestFor.length > 0) {
    content += '<h4>Best For</h4><ul>';
    productData.bestFor.forEach((use: string) => {
      content += `<li>${use}</li>`;
    });
    content += '</ul>';
  }

  // Add the original description
  if (description) {
    content += `<div class="description-text">${description}</div>`;
  }

  return content;
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="3" x2="8" y2="13" />
      <line x1="3" y1="8" x2="13" y2="8" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="8" x2="13" y2="8" />
    </svg>
  );
}
