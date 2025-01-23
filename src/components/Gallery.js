import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchArtworks = async (page = 1) => {
    const accessKey = 'xYk4-ZtE5jiWW-ZqZv3vH3bUbxYs5s9UmWycyAubIRc';
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=20&page=${page}`
      );
      setArtworks((prevArtworks) => [...prevArtworks, ...response.data]); // Append new images
      setLoading(false);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(page);
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="gallery-container">
      <h1>Discover your favourite!</h1>

      {loading && <p>Loading...</p>}

      <div className="gallery-scroll">
        {artworks.map((artwork) => (
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
