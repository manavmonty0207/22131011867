import React, { useEffect, useState } from 'react';

const UrlList = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('urlMappings')) || {};
    setData(stored);
  }, []);

  return (
    <div>
      <h2>All Shortened URLs</h2>
      <ul>
        {Object.entries(data).map(([code, { longUrl, expiry }]) => (
          <li key={code}>
            <strong>{code}</strong>: {longUrl} (valid till {new Date(expiry).toLocaleTimeString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
