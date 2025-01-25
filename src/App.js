import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Sidebar from './components/Sidebar';
import Paintings from './components/Paintings';
import Sculptures from './components/Sculptures';
import Artists from './components/Artists';
import About from './components/About';
import WelcomeScreen from './components/WelcomeScreen'; // Import WelcomeScreen component
import Home from './components/LandingPage'; // Import Home (Landing Page) component
import CollectionArtworks from './components/CollectionArtworks'; // Import CollectionArtworks component
import ArtworkDetail from './components/ArtworkDetail'; // Import ArtworkDetail component

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isWelcomeScreenVisible, setIsWelcomeScreenVisible] = useState(true); // Manage WelcomeScreen visibility

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const hideWelcomeScreen = () => {
    setIsWelcomeScreenVisible(false); // Dismiss WelcomeScreen
  };

  return (
    <Router>
      <div className="App">
        {isWelcomeScreenVisible ? ( // Show WelcomeScreen if visible
          <WelcomeScreen onDismiss={hideWelcomeScreen} />
        ) : (
          <>
            <Header onToggleSidebar={toggleSidebar} />
            <MainContent
              selectedCategory={selectedCategory}
              isSidebarVisible={isSidebarVisible}
              toggleSidebar={toggleSidebar}
              handleCategorySelect={handleCategorySelect}
            />
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

function MainContent({ selectedCategory, isSidebarVisible, toggleSidebar, handleCategorySelect }) {
  const location = useLocation(); // Get current route

  // Only show sidebar if we're not on the landing page
  const shouldShowSidebar = location.pathname !== '/';

  return (
    <div className="main-content">
      {/* Conditionally render Sidebar: Hide it on landing page */}
      {shouldShowSidebar && (
        <Sidebar
          onCategorySelect={handleCategorySelect}
          isSidebarVisible={isSidebarVisible}
          onToggleSidebar={toggleSidebar}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Landing Page */}
        <Route
          path="/gallery"
          element={<Gallery searchQuery={selectedCategory} />}
        />
        <Route
          path="/collections/:subcategory"
          element={<CollectionArtworks />}
        />
        <Route
          path="/artwork/:id"
          element={<ArtworkDetail />}
        />
        <Route path="/paintings" element={<Paintings />} />
        <Route path="/sculptures" element={<Sculptures />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
