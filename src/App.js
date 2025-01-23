// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import ArtworkDetail from './components/ArtworkDetail'; // New component for artwork details

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Gallery />} />
                    <Route path="/artwork/:id" element={<ArtworkDetail />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
