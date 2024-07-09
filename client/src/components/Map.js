// client/src/components/Map.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet/hooks';
import L from 'leaflet';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const SearchControl = ({ provider, setMarkers }) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
      retainZoomLevel: true,
      animateZoom: true,
      autoClose: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      console.log('Search result:', result);
      const { lat, lng } = result.location;
      if (lat && lng) {
        setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);
      } else {
        console.error('Invalid location data:', result.location);
      }
    });

    return () => map.removeControl(searchControl);
  }, [map, provider, setMarkers]);

  return null;
};

const Map = () => {
  const [markers, setMarkers] = useState(() => {
    const savedMarkers = localStorage.getItem('markers');
    return savedMarkers ? JSON.parse(savedMarkers) : [];
  });

  useEffect(() => {
    localStorage.setItem('markers', JSON.stringify(markers));
  }, [markers]);

  const AddMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (lat && lng) {
          setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);
        } else {
          console.error('Invalid LatLng on click:', e.latlng);
        }
      },
    });
    return null;
  };

  const handleDelete = (indexToDelete, e) => {
    e.stopPropagation();
    setMarkers((prevMarkers) => prevMarkers.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="my-8 py-8 px-4 md:px-8">
      <h2 className="main-title">Travel Map</h2>
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SearchControl provider={new OpenStreetMapProvider()} setMarkers={setMarkers} />
        <AddMarker />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            <Popup>
              <div>
                {`Marker at latitude: ${marker.lat}, longitude: ${marker.lng}`}
                <br />
                <button onClick={(e) => handleDelete(index, e)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">Delete</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
