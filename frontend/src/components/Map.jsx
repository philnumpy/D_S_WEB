import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

const defaultCenter = {
  lat: 28.6139, // Change to desired default latitude
  lng: 77.2090, // Change to desired default longitude
};

const Map = ({ projectTitle, latitude, longitude }) => {
  const center = latitude && longitude ? { lat: latitude, lng: longitude } : defaultCenter;

  return (
    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
      <LoadScript googleMapsApiKey="AIzaSyAFrqjqk0SjeH4kKzLiYoI08div5TuO1TI">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>

      {/* Project Title Overlay */}
      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded shadow text-sm font-medium text-gray-900">
        {projectTitle}
      </div>
    </div>
  );
};

export default Map;
