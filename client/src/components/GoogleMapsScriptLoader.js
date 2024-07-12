import React, { useEffect } from 'react';

const GoogleMapsScriptLoader = ({ onLoad }) => {
  useEffect(() => {
    const existingScript = document.getElementById('googleMaps');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`;
      script.id = 'googleMaps';
      document.body.appendChild(script);

      script.onload = () => {
        if (onLoad) onLoad();
      };
    } else {
      if (onLoad) onLoad();
    }
  }, [onLoad]);

  return null;
};

export default GoogleMapsScriptLoader;
