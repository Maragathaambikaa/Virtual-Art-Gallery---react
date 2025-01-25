import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessKey = 'xYk4-ZtE5jiWW-ZqZv3vH3bUbxYs5s9UmWycyAubIRc'; // Your Unsplash API Key

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=artists&per_page=20`
        );

        const fetchedArtists = response.data.results.map((item) => ({
          id: item.id,
          name: item.user.name || 'Unknown Artist', // Name of the uploader (simulated as "artist")
          image: item.urls.small, // URL for the small-sized painting
          bio: item.user.bio || 'Biography not available.', // Uploader's bio if available
          portfolio: item.user.links.html, // Link to the user's Unsplash profile
        }));

        setArtists(fetchedArtists);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data from Unsplash API:', err);
        setError('Failed to load artist details.');
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <div>Loading artists...</div>; // Show a loading state
  }

  if (error) {
    return <div>{error}</div>; // Show an error message
  }

  return (
    <div className="gallery-container">
      <h1>Artists</h1>
      <p>Discover the creators behind the masterpieces!</p>
      <div className="artist-list">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-card">
            <img src={artist.image} alt={artist.name} />
            <h3>{artist.name}</h3>
            <p>{artist.bio}</p>
            <a
              href={artist.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Portfolio
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
