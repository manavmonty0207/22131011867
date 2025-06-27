import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logEvent } from '../utils/logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const mappings = JSON.parse(localStorage.getItem('urlMappings')) || {};
    const entry = mappings[shortcode];
    if (!entry) {
      alert('Short URL not found.');
      navigate('/');
      return;
    }
    if (new Date().getTime() > entry.expiry) {
      alert('Link expired.');
      logEvent('Expired Link Access', { shortcode });
      navigate('/');
      return;
    }
    logEvent('Redirecting', { shortcode, to: entry.longUrl });
    window.location.href = entry.longUrl;
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
