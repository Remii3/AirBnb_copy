import React, { useState } from 'react';
import { Map as MapGL, Marker, Popup } from 'react-map-gl';

import { getCenter } from 'geolib';

const Map = ({
  searchResults,
}: {
  searchResults: {
    img: string;
    location: string;
    title: string;
    description: string;
    star: number;
    price: string;
    total: string;
    long: number;
    lat: number;
  }[];
}) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates);
  const [viewPort, setViewPort] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 11,
  });

  return (
    <MapGL
      {...viewPort}
      mapStyle="mapbox://styles/remiii-3/clb49napp000i15mdtfrvjrm4"
      mapboxAccessToken={process.env.mapbox_key}
      onMove={evt => setViewPort(evt.viewState)}
    >
      {searchResults.map(result => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat}>
            <p
              role={'img'}
              onClick={() => setSelectedLocation(result)}
              aria-label="push-pin"
              className="cursor-pointer text-2xl animate-bounce"
            >
              🚨
            </p>
          </Marker>
          {selectedLocation.long === result ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              longitude={result.long}
              latitude={result.lat}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </MapGL>
  );
};

export default Map;
