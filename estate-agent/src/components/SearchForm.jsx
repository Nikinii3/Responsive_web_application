import React, { useState } from 'react';
import { DropdownList, NumberPicker } from 'react-widgets';
import 'react-widgets/styles.css';

const PROPERTY_TYPES = ['Any', 'House', 'Flat'];

const PRICE_OPTIONS = [
  { label: 'No min', value: '' },
  { label: 'LKR100,000', value: 100000 },
  { label: 'LKR200,000', value: 200000 },
  { label: 'LKR300,000', value: 300000 },
  { label: 'LKR400,000', value: 400000 },
  { label: 'LKR500,000', value: 500000 },
  { label: 'LKR750,000', value: 750000 },
  { label: 'LKR1,000,000', value: 1000000 },
];

const MAX_PRICE_OPTIONS = [
  { label: 'No max', value: '' },
  { label: 'LKR200,000', value: 200000 },
  { label: 'LKR400,000', value: 400000 },
  { label: 'LKR600,000', value: 600000 },
  { label: 'LKR800,000', value: 800000 },
  { label: 'LKR1,000,000', value: 1000000 },
  { label: 'LKR1,500,000', value: 1500000 },
  { label: 'LKR2,000,000', value: 2000000 },
];

/**
 * SearchForm — Simple search box with collapsible advanced filters.
 * @param {{ onSearch: Function }} props
 */
export default function SearchForm({ onSearch }) {
  const [type, setType] = useState('Any');
  const [minPrice, setMinPrice] = useState(PRICE_OPTIONS[0]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE_OPTIONS[0]);
  const [minBedrooms, setMinBedrooms] = useState(null);
  const [maxBedrooms, setMaxBedrooms] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [postcode, setPostcode] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch({
      type,
      minPrice: minPrice?.value ?? '',
      maxPrice: maxPrice?.value ?? '',
      minBedrooms: minBedrooms ?? '',
      maxBedrooms: maxBedrooms ?? '',
      dateFrom: dateFrom || null,
      dateTo: dateTo || null,
      postcode,
    });
  };

  const handleReset = () => {
    setType('Any');
    setMinPrice(PRICE_OPTIONS[0]);
    setMaxPrice(MAX_PRICE_OPTIONS[0]);
    setMinBedrooms(null);
    setMaxBedrooms(null);
    setDateFrom('');
    setDateTo('');
    setPostcode('');
    onSearch({});
  };

  return (
    <div className="search-form-wrapper">
      {/* Simple Search Box */}
      <div className="search-form-header">
        <h2>Search Properties</h2>
        <div className="search-form-simple">
          <input
            type="text"
            className="search-input-main"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            placeholder="🔍︎ Location, price, bedrooms, type..."
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        
        {/* Toggle Advanced Filters */}
        <button 
          className="btn btn-filters"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? ' ⬆ Hide Advanced Filters' : ' ⬇ Show Advanced Filters'}
        </button>
      </div>

      {/* Advanced Filters Section (Collapsible) */}
      {showFilters && (
        <div className="search-form-advanced">
          <div className="filters-grid">
            {/* Property Type */}
            <div className="form-group">
              <label className="form-label">Property Type</label>
              <DropdownList
                data={PROPERTY_TYPES}
                value={type}
                onChange={setType}
                containerClassName="rw-widget"
              />
            </div>

            {/* Min Price */}
            <div className="form-group">
              <label className="form-label">Min Price</label>
              <DropdownList
                data={PRICE_OPTIONS}
                value={minPrice}
                onChange={setMinPrice}
                dataKey="value"
                textField="label"
                placeholder="No minimum"
              />
            </div>

            {/* Max Price */}
            <div className="form-group">
              <label className="form-label">Max Price</label>
              <DropdownList
                data={MAX_PRICE_OPTIONS}
                value={maxPrice}
                onChange={setMaxPrice}
                dataKey="value"
                textField="label"
                placeholder="No maximum"
              />
            </div>

            {/* Min Bedrooms */}
            <div className="form-group">
              <label className="form-label">Min Bedrooms</label>
              <NumberPicker
                min={0} max={10}
                value={minBedrooms}
                onChange={setMinBedrooms}
                placeholder="Any"
              />
            </div>

            {/* Max Bedrooms */}
            <div className="form-group">
              <label className="form-label">Max Bedrooms</label>
              <NumberPicker
                min={0} max={10}
                value={maxBedrooms}
                onChange={setMaxBedrooms}
                placeholder="Any"
              />
            </div>

            {/* Date From */}
            <div className="form-group">
              <label className="form-label">Added From</label>
              <input
                type="date"
                className="rw-input"
                value={dateFrom}
                max={dateTo || undefined}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            {/* Date To */}
            <div className="form-group">
              <label className="form-label">Added To</label>
              <input
                type="date"
                className="rw-input"
                value={dateTo}
                min={dateFrom || undefined}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="search-form-actions">
            <button className="btn btn-primary" onClick={handleSearch}>
               🔍︎ Search
            </button>
            <button className="btn btn-outline" onClick={handleReset}>
               ↻ Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}