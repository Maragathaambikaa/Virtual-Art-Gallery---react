import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section with Video Background */}
      <section className="hero-section">
        <video className="background-video" autoPlay loop muted>
          <source
            src="https://videos.pexels.com/video-files/5434006/5434006-hd_1920_1080_25fps.mp4" // Replace with actual video URL
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <h1>The Finest Art Works</h1>
          <p>
            Immerse yourself in a world of creativity. Discover breathtaking
            paintings, exquisite sculptures, and more from artists around the
            globe.
          </p>
          {/* Updated to navigate to the Gallery directly */}
          <Link to="/gallery">
            <button className="explore-btn">Explore the Gallery</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
