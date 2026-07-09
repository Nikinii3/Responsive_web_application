import React, { useState } from 'react';
import propertiesData from '../data/properties.json';
import SearchForm from '../components/SearchForm.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import FavouritesPanel from '../components/FavouritesPanel.jsx';
import { searchProperties } from '../utils/searchUtils.js';

/**
 * SearchPage — main SPA page with search form, results grid, and favourites.
 */
export default function SearchPage() {
  const allProperties = propertiesData.properties;
  const [results, setResults] = useState(allProperties);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (criteria) => {
    if (!criteria || Object.keys(criteria).length === 0) {
      setResults(allProperties);
      setHasSearched(false);
      return;
    }
    const filtered = searchProperties(allProperties, criteria);
    setResults(filtered);
    setHasSearched(true);
  };

  return (
    <div className="search-page">
      {/* Search form at top */}
      <SearchForm onSearch={handleSearch} />
      
      <div className="container">
        <div className="search-page-grid">
          {/* Main: results */}
          <section className="search-main">
            <div className="results-header">
              <h2>
                {hasSearched ? 'Search Results' : 'All Properties'}
              </h2>
              <span className="results-count">
                <strong>{results.length}</strong> {results.length === 1 ? 'property' : 'properties'} found
              </span>
            </div>

            {results.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🏚</div>
                <p>No properties match your search criteria.<br />Try broadening your search.</p>
              </div>
            ) : (
              <div className="results-grid">
                {results.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </section>

          <aside className="search-sidebar">
            <FavouritesPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}
