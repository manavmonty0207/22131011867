import React, { useState, useEffect } from 'react';
import { generateShortcode } from '../utils/generateShortcode';
import { logEvent } from '../utils/logger';

const UrlShortenerForm = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState(30);
  const [urlMappings, setUrlMappings] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('urlMappings')) || {};
    setUrlMappings(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const shortcode = customCode || generateShortcode();
    if (urlMappings[shortcode]) {
      alert('Shortcode already exists!');
      return;
    }
    const expiry = new Date().getTime() + validity * 60000;
    const updated = { ...urlMappings, [shortcode]: { longUrl, expiry } };
    localStorage.setItem('urlMappings', JSON.stringify(updated));
    setUrlMappings(updated);
    logEvent('Short URL Created', { shortcode, longUrl, expiry });
    alert(`Shortened URL: http://localhost:3000/${shortcode}`);
    setLongUrl('');
    setCustomCode('');
    setValidity(30);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="url" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="Enter URL" required />
      <input type="text" value={customCode} onChange={(e) => setCustomCode(e.target.value)} placeholder="Custom shortcode (optional)" />
      <input type="number" value={validity} onChange={(e) => setValidity(e.target.value)} min="1" placeholder="Validity (minutes)" />
      <button type="submit">Shorten</button>
    </form>
  );
};

export default UrlShortenerForm;
