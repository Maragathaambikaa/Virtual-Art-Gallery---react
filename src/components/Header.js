import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onSearch, onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* Sidebar toggle button */}
        <button className="sidebar-toggle-button" onClick={onToggleSidebar}>
          ☰
        </button>
        <div className="header-logo">
          <h1>
            <Link to="/">Virtual Art Gallery</Link>
          </h1>
        </div>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/paintings">Paintings</Link>
          </li>
          <li>
            <Link to="/sculptures">Sculptures</Link>
          </li>
          <li>
            <Link to="/artists">Artists</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </nav>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search artworks..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </header>
  );
};

export default Header;
