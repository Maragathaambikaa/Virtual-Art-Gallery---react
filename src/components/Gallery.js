import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Gallery.css';

const Gallery = ({ searchQuery }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get current route
  const query = location.pathname.includes('paintings')
    ? 'paintings'
    : location.pathname.includes('sculptures')
    ? 'sculptures'
    : ''; // Determine the query based on the route

  useEffect(() => {
    const fetchArtworks = async () => {
      const accessKey = 'xYk4-ZtE5jiWW-ZqZv3vH3bUbxYs5s9UmWycyAubIRc'; // Replace with your API key
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query || 'artworks'}&per_page=20`
        );
        setArtworks(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [query]);

  const filteredArtworks = artworks.filter((artwork) =>
    artwork.alt_description?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  return (
    <div className="gallery-container">
      <h1>{query ? query.charAt(0).toUpperCase() + query.slice(1) : 'Virtual Art Gallery'}</h1>
      {loading && <p>Loading...</p>}
      <div className="gallery-scroll">
        {filteredArtworks.map((artwork) => (
          <div key={artwork.id} className="artwork-card">
            <Link to={`/artwork/${artwork.id}`}>
              <div className="artwork-image">
                <img src={artwork.urls.small} alt={artwork.alt_description} />
                <div className="artwork-description">
                  <p>{artwork.alt_description || 'Untitled Artwork'}</p>
                </div>
              </div>
            </Link>
            <p className="artwork-username">By: {artwork.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
