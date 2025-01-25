import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Use Link for navigation
import './Gallery.css'; // Reuse gallery styles

const CollectionArtworks = () => {
  const { subcategory } = useParams(); // Retrieve subcategory from URL
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessKey = 'xYk4-ZtE5jiWW-ZqZv3vH3bUbxYs5s9UmWycyAubIRc';

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(subcategory)}&client_id=${accessKey}&per_page=10`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch artworks');
        }
        const data = await response.json();
        setArtworks(data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [subcategory]); // Fetch artworks whenever the subcategory changes

  if (loading) {
    return <div>Loading artworks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gallery-container">
      <h2>{subcategory} Artworks</h2>
      <div className="gallery-scroll">
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <div key={artwork.id} className="artwork-card">
              <Link to={`/artwork/${artwork.id}`}>
                <div className="artwork-image">
                  <img src={artwork.urls.small} alt={artwork.alt_description} />
                </div>
              </Link>
              <p className="artwork-username">By: {artwork.user.name}</p>
            </div>
          ))
        ) : (
          <p>No artworks available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionArtworks;
