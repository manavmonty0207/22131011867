import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import RedirectHandler from './components/RedirectHandler';
import UrlList from './components/UrlList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/list" element={<UrlList />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}
export default App;
