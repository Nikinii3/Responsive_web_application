import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useFavourites } from '../context/FavouritesContext.jsx';
import { DRAG_TYPE } from './PropertyCard.jsx';
import { formatPrice } from '../utils/searchUtils.js';

/**
 * A single draggable item in the favourites list.
 */
function FavItem({ property, onRemove }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FAV_ITEM',
    item: { id: property.id },
    collect: (m) => ({ isDragging: m.isDragging() }),
  }));

  return (
    <div ref={drag} className="fav-item" style={{ opacity: isDragging ? 0.4 : 1 }}>
      <img src={property.picture} alt={property.type} />
      <div className="fav-item-info">
        <div className="fav-item-name">{property.location.split(',')[0]}</div>
        <div className="fav-item-price">{formatPrice(property.price)}</div>
      </div>
      <button
        className="fav-item-remove"
        onClick={() => onRemove(property.id)}
        title="Remove from favourites"
        aria-label={`Remove ${property.location} from favourites`}
      >
        ✕
      </button>
    </div>
  );
}

/**
 * FavouritesPanel — drop zone + list of saved properties.
 */
export default function FavouritesPanel() {
  const { favourites, addFavourite, removeFavourite, clearFavourites } = useFavourites();

  // Accept drops from property cards
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DRAG_TYPE,
    drop: (item) => addFavourite(item),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  // Accept drops OUT from fav items (drag out to remove)
  const [{ isOverBin }, binDrop] = useDrop(() => ({
    accept: 'FAV_ITEM',
    drop: (item) => removeFavourite(item.id),
    collect: (m) => ({ isOverBin: m.isOver() }),
  }));

  return (
    <section className="favourites-panel" id="favourites">
      <div className="favourites-header">
        <h3>❤️ Favourites <span style={{ fontWeight: 400, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>({favourites.length})</span></h3>
        {favourites.length > 0 && (
          <button className="btn btn-danger btn-sm" onClick={clearFavourites}>
            Clear All
          </button>
        )}
      </div>

      {/* Drop zone for adding */}
      <div ref={drop} className={`drop-zone${isOver ? ' over' : ''}`}>
        {favourites.length === 0 ? (
          <div className="drop-zone-empty">
            <div></div>
            <div>Drag a property here<br/>or press ❤️ to save</div>
          </div>
        ) : (
          <div className="fav-list" style={{ width: '100%' }}>
            {favourites.map((p) => (
              <FavItem key={p.id} property={p} onRemove={removeFavourite} />
            ))}
          </div>
        )}
      </div>

      {/* Drag-out bin */}
      {favourites.length > 0 && (
        <div
          ref={binDrop}
          style={{
            marginTop: 10, borderRadius: 8, border: `2px dashed ${isOverBin ? 'var(--color-danger)' : 'var(--color-border)'}`,
            background: isOverBin ? '#fde8e8' : 'transparent',
            padding: '10px', textAlign: 'center',
            fontSize: '0.8rem', color: isOverBin ? 'var(--color-danger)' : 'var(--color-text-muted)',
            transition: 'all 0.2s',
          }}
        >
          🗑 Drag here to remove
        </div>
      )}
    </section>
  );
}
