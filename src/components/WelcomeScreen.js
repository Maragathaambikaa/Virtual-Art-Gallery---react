import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onDismiss }) => {
  return (
    <div className="welcome-screen">
      <video autoPlay loop muted className="background-video">
        <source src="https://videos.pexels.com/video-files/28988749/12538533_1920_1080_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="welcome-content">
        <h1>Welcome to the Virtual Art Gallery</h1>
        <p>Explore the finest artworks from around the world.</p>
        <button onClick={onDismiss}>Enter Gallery</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
