import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/build/image-gallery.css";
import { useFavourites } from '../context/FavouritesContext.jsx';
import { formatPrice } from '../utils/searchUtils.js';
import propertiesData from '../data/properties.json';

/**
 * PropertyPage — full property view displaying standard layout details.
 */
export default function PropertyPage() {
  const { id } = useParams();
  const property = propertiesData.properties.find((p) => p.id === id);
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  if (!property) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Property not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>← Back to Search</Link>
      </div>
    );
  }

  const fav = isFavourite(property.id);

  // Build image-gallery array cleanly
  const galleryItems = property.images ? property.images.map((src) => ({
    original: src,
    thumbnail: src,
    originalAlt: `${property.type} in ${property.location}`,
    thumbnailAlt: `Thumbnail`,
  })) : [];

  const safeDesc = property.description ? property.description.replace(/<[^>]+>/g, '') : '';

  // Google Maps iframe embed URL - works reliably for location search
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed&z=15`;

  return (
    <div className="property-page">
      {/* Header with Back Link */}
      <div className="property-page-header">
        <div className="container">
          <Link to="/" className="property-page-back">← Back to search results</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="property-page-layout">
          {/* Left: Gallery & Tabs */}
          <div className="property-main">
            {/* Gallery Section */}
            <div className="gallery-section">
              {galleryItems.length > 0 ? (
                <ImageGallery
                  items={galleryItems}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  thumbnailPosition="bottom"
                  lazyLoad={true}
                />
              ) : (
                <div className="empty-state">No images available</div>
              )}
            </div>

            {/* Tabs Section */}
            <div className="property-tabs-section">
              <Tabs>
                <TabList>
                  <Tab>📄 Description</Tab>
                  <Tab>📐 Floor Plan</Tab>
                  <Tab>🗺 Location</Tab>
                </TabList>

                {/* Tab 1: Description */}
                <TabPanel>
                  <div className="tab-description">
                    <p>{safeDesc}</p>
                    <div className="property-details-grid">
                      <div className="property-detail-item">
                        <div className="property-detail-label">Property Type</div>
                        <div className="property-detail-value">{property.type}</div>
                      </div>
                      <div className="property-detail-item">
                        <div className="property-detail-label">Bedrooms</div>
                        <div className="property-detail-value">{property.bedrooms}</div>
                      </div>
                      <div className="property-detail-item">
                        <div className="property-detail-label">Tenure</div>
                        <div className="property-detail-value">{property.tenure}</div>
                      </div>
                      <div className="property-detail-item">
                        <div className="property-detail-label">Added</div>
                        <div className="property-detail-value">
                          {property.added?.day} {property.added?.month} {property.added?.year}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>

                {/* Tab 2: Floor Plan */}
                <TabPanel>
                  <div className="tab-floorplan">
                    {property.floorplan ? (
                      <img
                        src={property.floorplan}
                        alt="Floor plan"
                      />
                    ) : (
                      <p>No floor plan available</p>
                    )}
                    <p className="disclaimer">Floor plan is indicative and may not be to scale.</p>
                  </div>
                </TabPanel>

                {/* Tab 3: Location Map */}
                <TabPanel>
                  <div className="tab-map">
                    <iframe
                      title={`Map of ${property.location}`}
                      src={mapUrl}
                      width="100%"
                      height="420"
                      style={{ border: 0, borderRadius: '8px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <p className="disclaimer">{property.location}</p>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>

          {/* Right: Sidebar Info Card */}
          <aside className="property-sidebar">
            <div className="property-card-main">
              {/* Type Badge */}
              <div className="property-badge">{property.type.toUpperCase()}</div>

              {/* Price */}
              <div className="property-price-main">{formatPrice(property.price)}</div>

              {/* Title & Location */}
              <div className="property-card-header">
                <h1 className="property-title">{property.bedrooms} bedroom {property.type}</h1>
                <p className="property-location">{property.location}</p>
              </div>

              {/* Details Grid */}
              <div className="property-details-sidebar">
                <div className="detail-row">
                  <span className="detail-label">TYPE</span>
                  <span className="detail-value">{property.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">BEDROOMS</span>
                  <span className="detail-value">{property.bedrooms} 🛏</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">TENURE</span>
                  <span className="detail-value">{property.tenure}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">LISTED</span>
                  <span className="detail-value">{property.added?.month} {property.added?.year}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="property-actions-main">
                <button
                  className={`btn btn-action ${fav ? 'fav-active' : 'btn-primary'}`}
                  onClick={() => fav ? removeFavourite(property.id) : addFavourite(property)}
                >
                  {fav ? '❤️ Remove from Favourites' : '🤍 Add to Favourites'}
                </button>
                <Link to="/" className="btn btn-secondary">
                  ← Back to Results
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}