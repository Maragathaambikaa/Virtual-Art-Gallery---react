import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onCategorySelect, isSidebarVisible, onToggleSidebar }) => {
  const categories = [
    {
      name: 'Indian Traditional',
      subcategories: ['North Traditional', 'South Traditional'],
    },
    {
      name: 'Modern Art',
      subcategories: ['Abstract', 'Minimalist'],
    },
    {
      name: 'Western Art',
      subcategories: ['Renaissance', 'Baroque'],
    },
  ];

  return (
    <div className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
      <button className="close-sidebar-button" onClick={onToggleSidebar}>
        X
      </button>
      <h2>Explore Collections</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <div className="category-title">{category.name}</div>
            <ul className="subcategory-list">
              {category.subcategories.map((subcategory) => (
                <Link
                  to={`/collections/${subcategory.toLowerCase().replace(/ /g, '-')}`}
                  key={subcategory}
                  onClick={() => onToggleSidebar()}
                >
                  <li>{subcategory}</li>
                </Link>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
