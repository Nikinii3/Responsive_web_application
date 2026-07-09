import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useFavourites } from '../context/FavouritesContext.jsx';
import { formatPrice } from '../utils/searchUtils.js';

export const DRAG_TYPE = 'PROPERTY';

/**
 * PropertyCard — displays a property summary with drag-to-favourite support.
 * @param {{ property: object }} props
 */
export default function PropertyCard({ property }) {
  const { addFavourite, isFavourite } = useFavourites();
  const fav = isFavourite(property.id);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DRAG_TYPE,
    item: property,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  // Sanitise description for display (strip potential HTML)
  const safeDesc = property.description.replace(/<[^>]+>/g, '');

  return (
    <div
      ref={drag}
      className={`property-card${isDragging ? ' dragging' : ''}`}
      title="Drag to favourites"
    >
      <div className="property-card-image">
        <img src={property.picture} alt={`${property.type} in ${property.location}`} loading="lazy" />
        <span className="property-card-badge">{property.type}</span>
        {/* Favourite heart button */}
        <button
          className={`property-card-fav-btn${fav ? ' active' : ''}`}
          onClick={(e) => { e.preventDefault(); addFavourite(property); }}
          title={fav ? 'Already in favourites' : 'Add to favourites'}
          aria-label={fav ? 'Already in favourites' : 'Add to favourites'}
        >
          {fav ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="property-card-body">
        <div className="property-card-price">{formatPrice(property.price)}</div>
        <div className="property-card-type-badges">
          <span className="badge">🛏 {property.bedrooms} bed</span>
          <span className="badge">{property.tenure}</span>
        </div>
        <div className="property-card-location"> {property.location}</div>
        <p className="property-card-desc">{safeDesc}</p>
        <div className="property-card-footer">
          <span className="property-card-added">
            Added {property.added.day} {property.added.month} {property.added.year}
          </span>
          <Link to={`/property/${property.id}`} className="btn btn-primary btn-sm">
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}
