import React from 'react';
import { Link } from 'react-router-dom';

/**
 * website header with logo, nav and tagline.
 */
export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="logo-icon"></span>
          <div>
            <div>PrimeNest</div>
            <div className="header-tagline">Find your perfect property</div>
          </div>
        </Link>
        <nav className="header-nav">
          <a href="#search-form" className="header-nav-link"> Search</a>
          <a href="#favourites" className="header-nav-link"> Favourites</a>
        </nav>
      </div>
    </header>
  );
}
