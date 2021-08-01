import React, { useRef, useEffect, useState } from "react";

import "./Map.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// get accesstoken from 👉https://account.mapbox.com/access-tokens/
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2hhbGVkciIsImEiOiJja3BzN2t1OHMwZHQxMm5vY25tY3Q3NHI5In0.akzVvXBLn643NdB94sZaGg";

  // 👇add below line of code to index.html👇
//   <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />

const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  
  const [lat, setLat] = useState(props.coordinates.lat);
  const [lng, setLng] = useState(props.coordinates.lng);
  const [zoom, setZoom] = useState(props.zoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // setLat(props.coordinates.lat);
  // setLng(props.coordinates.lng);
  // setZoom(props.zoom);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
