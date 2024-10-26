import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";

const Testing = () => {
  const secretToken =
    "sk.eyJ1IjoiY2hyaXNnb3N5IiwiYSI6ImNsc2N3a2FnYjBuNmEyamw1aGFxaXkwdDIifQ.s6_zWqL37X1KByCtHjAISQ";

  const publicToken =
    "pk.eyJ1IjoiY2hyaXNnb3N5IiwiYSI6ImNsc2N3OW16ZDBrc3QyaXBjNDdoamR6a2QifQ.s9urqK9_oBV6_9XqdHtSFg";

  const style =
    "https://api.mapbox.com/styles/v1/chrisgosy/clscxrxx901ac01qs5uxpdcuk.html?title=view&access_token=pk.eyJ1IjoiY2hyaXNnb3N5IiwiYSI6ImNsc2N3OW16ZDBrc3QyaXBjNDdoamR6a2QifQ.s9urqK9_oBV6_9XqdHtSFg&zoomwheel=true&fresh=true#2/37.75/-92.25";

  mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hyaXNnb3N5IiwiYSI6ImNsc2N3OW16ZDBrc3QyaXBjNDdoamR6a2QifQ.s9urqK9_oBV6_9XqdHtSFg";

  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  const [viewport, setViewport] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 3.5,
      });
    });
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    const watchUserLocation = () => {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo({ center: [longitude, latitude], zoom: 14 });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    };

    watchUserLocation();

    return () => {
      map.remove();
    };
  }, []);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [userAddress, setUserAddress] = useState();

  const [GPSLatitude, setGPSLatitude] = useState();
  const [GPSLongitude, setGPSLongitude] = useState();

  const geo = navigator.geolocation;

  geo.getCurrentPosition(userCoords);
  function userCoords(position) {
    let userLatitude = position.coords.latitude;
    let userLongitude = position.coords.longitude;

    setLatitude(userLatitude);
    setLongitude(userLongitude);
  }

  const getUserAddress = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=f2eaccb131fc4b29851519491c4d25c6&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
    const loc = await fetch(url);
    const data = await loc.json();
    console.log("User address: ", data);
    setUserAddress(data.results[0].formatted);
  };

  const handleGetUserAddress = () => {
    getUserAddress();
  };

  const watchID = geo.watchPosition(userGPSCoords);
  function userGPSCoords(position) {
    let userGPSLatitude = position.coords.latitude;
    let userGPSLongitude = position.coords.longitude;
    console.log("latitude: ", userGPSLatitude);
    console.log("longitude: ", userGPSLongitude);
    setLatitude(userGPSLatitude);
    setLongitude(userGPSLongitude);
  }

  const stopGPS = () => {
    geo.clearWatch(watchID);
  };

  return (
    <div className="w-full h-[500px]">
      {/* <div>
        {viewport.latitude && viewport.longitude && (
          <div>
            <h1>Your Location:</h1>
            <Map
              mapboxAccessToken="pk.eyJ1IjoiY2hyaXNnb3N5IiwiYSI6ImNsc2N3OW16ZDBrc3QyaXBjNDdoamR6a2QifQ.s9urqK9_oBV6_9XqdHtSFg"
              initialViewState={viewport}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              <Marker
                longitude={viewport.longitude}
                latitude={viewport.latitude}
              />
            </Map>
          </div>
        )}
      </div> */}
      <div
        id="map"
        style={{ width: "100%", height: "400px" }}
        ref={mapContainerRef}
      ></div>
      <h4>latitude: {latitude}</h4>
      <h4>longitude: {longitude}</h4>
      <h4>user Address: {userAddress}</h4>
      <button onClick={handleGetUserAddress}>get user address</button>
      {/* <MapContainer center={position} zoom={zoom} style={{ height: "400px" }}>
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
      </MapContainer> */}
    </div>
  );
};

export default Testing;
