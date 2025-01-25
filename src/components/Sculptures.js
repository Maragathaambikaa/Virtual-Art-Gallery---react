import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Gallery.css';

const Sculptures = () => {
  const [sculptures, setSculptures] = useState([]);

  useEffect(() => {
    const fetchSculptures = async () => {
      const accessKey = 'xYk4-ZtE5jiWW-ZqZv3vH3bUbxYs5s9UmWycyAubIRc'; // Replace with your API key
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=sculptures&per_page=20`
        );
        setSculptures(response.data.results);
      } catch (error) {
        console.error('Error fetching sculptures:', error);
      }
    };

    fetchSculptures();
  }, []);

  return (
    <div className="gallery-container">
      <h1>Sculptures</h1>
      <div className="gallery-scroll">
        {sculptures.map((artwork) => (
          <div key={artwork.id} className="artwork-card">
            <Link to={`/artwork/${artwork.id}`}>
              <div className="artwork-image">
                <img src={artwork.urls.small} alt={artwork.alt_description} />
              </div>
              
            </Link>
            <p className="artwork-username">By: {artwork.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sculptures;
