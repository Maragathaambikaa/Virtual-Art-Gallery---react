import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap'; // Optional for smoother animations
import './ArtworkDetail.css';

const ArtworkDetail = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchArtworkDetail = async () => {
    const accessKey = 'xYk4-ZtE5jiWW-ZqZv3vH3bUbxYs5s9UmWycyAubIRc'; // Replace with your API key
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/${id}?client_id=${accessKey}`);
      setArtwork(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching artwork details:', error);
      setError('Could not fetch artwork details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworkDetail();
  }, [id]);

  const handleMouseEnter = (e) => {
    gsap.to(e.target, { scale: 1.05, rotateY: 5, duration: 0.4 });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.target, { scale: 1, rotateY: 0, duration: 0.4 });
  };

  return (
    <div>
      {loading ? (
        <p>Loading artwork details...</p>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button onClick={() => navigate('/')}>Go Back to Gallery</button>
        </div>
      ) : (
        artwork && (
          <div className="artwork-detail">
            <h1>{artwork.alt_description}</h1>
            <div
              className="artwork-card"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={artwork.urls.regular}
                alt={artwork.alt_description}
              />
              <div className="artwork-description">
                <p>{artwork.description || 'No description available'}</p>
              </div>
            </div>
            <p>Artist: {artwork.user.name}</p>
            <button onClick={() => navigate('/')}>Back to Gallery</button>
          </div>
        )
      )}
    </div>
  );
};

export default ArtworkDetail;
