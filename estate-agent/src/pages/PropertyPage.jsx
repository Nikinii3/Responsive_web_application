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

  // Valid, open-source Google Maps iframe embed template literal syntax string
  const mapUrl = `https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`;

  return (
    <div className="property-page">
      <div className="container">
        <Link to="/" className="property-page-back">← Back to search results</Link>

        <div className="property-page-layout">
          {/* Left panel: Media galleries and responsive layout tabs */}
          <div>
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

            <div className="property-tabs-section" style={{ marginTop: '30px' }}>
              <Tabs>
                <TabList>
                  <Tab>📄 Description</Tab>
                  <Tab>📐 Floor Plan</Tab>
                  <Tab>🗺 Location</Tab>
                </TabList>

                {/* Tab 1: Description */}
                <TabPanel>
                  <div className="tab-description" style={{ padding: '20px 0' }}>
                    <p style={{ lineHeight: '1.6' }}>{safeDesc}</p>
                    <div style={{ marginTop: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
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
                  <div className="tab-floorplan" style={{ padding: '20px 0' }}>
                    {property.floorplan ? (
                      <img
                        src={property.floorplan}
                        alt="Floor plan"
                        style={{ width: '100%', maxHeight: 500, objectFit: 'contain', display: 'block' }}
                      />
                    ) : (
                      <p>No floor plan available</p>
                    )}
                    <p style={{ marginTop: 10, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                      Floor plan is indicative and may not be to scale.
                    </p>
                  </div>
                </TabPanel>

                {/* Tab 3: Location Map */}
                <TabPanel>
                  <div className="tab-map" style={{ padding: '20px 0' }}>
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
                    <p style={{ marginTop: 8, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                       {property.location}
                    </p>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>

          {/* Right panel: Information sidebar widgets */}
          <aside className="property-sidebar">
            <div className="property-info-card">
              <div className="property-info-header">
                <div className="property-info-price">{formatPrice(property.price)}</div>
                <div className="property-info-title">
                  {property.bedrooms} bedroom {property.type}
                </div>
                <div className="property-info-location"> {property.location}</div>
              </div>
              <div className="property-info-body">
                <div className="property-detail-grid">
                  <div className="property-detail-item">
                    <div className="property-detail-label">Type</div>
                    <div className="property-detail-value">{property.type}</div>
                  </div>
                  <div className="property-detail-item">
                    <div className="property-detail-label">Bedrooms</div>
                    <div className="property-detail-value">{property.bedrooms} 🛏</div>
                  </div>
                  <div className="property-detail-item">
                    <div className="property-detail-label">Tenure</div>
                    <div className="property-detail-value">{property.tenure}</div>
                  </div>
                  <div className="property-detail-item">
                    <div className="property-detail-label">Listed</div>
                    <div className="property-detail-value">{property.added?.month} {property.added?.year}</div>
                  </div>
                </div>

                <div className="property-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                  <button
                    className={`btn ${fav ? 'fav-active-btn' : 'btn-primary'}`}
                    onClick={() => fav ? removeFavourite(property.id) : addFavourite(property)}
                  >
                    {fav ? '❤️ Remove from Favourites' : '🤍 Add to Favourites'}
                  </button>
                  <Link to="/" className="btn btn-outline" style={{ textAlign: 'center' }}>
                    ← Back to Results
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}