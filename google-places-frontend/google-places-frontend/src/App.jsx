import React, { useState } from "react";
import axios from "axios";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

function App() {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [radius, setRadius] = useState("");
  const [places, setPlaces] = useState(null);
  const [error, setError] = useState("");

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!longitude || !latitude || !radius) {
      setError("Please enter longitude, latitude, and radius.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8070/places", {
        params: { longitude, latitude, radius },
      });
      setPlaces(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching places. Please try again.");
    }
  };

  const getMarkersData = () => {
    if (!places) return [];

    const { results } = places;
    if (!results || !Array.isArray(results)) return [];

    return results.map((place) => {
      const lat = place.geometry?.location?.lat;
      const lng = place.geometry?.location?.lng;
      return { lat, lng, name: place.name };
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "#242424",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Nearby Places</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
          maxWidth: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.25rem", fontWeight: "bold" }}>
            Longitude:
          </label>
          <input
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.25rem", fontWeight: "bold" }}>
            Latitude:
          </label>
          <input
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.25rem", fontWeight: "bold" }}>
            Radius (meters):
          </label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Search
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
          {error}
        </p>
      )}

      {isLoaded && places && (
        <div
          style={{
            width: "80%",
            height: "500px",
            marginTop: "2rem",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{
              lat: Number(latitude) || 37.7749,
              lng: Number(longitude) || -122.4194,
            }}
            zoom={12}
          >
            {getMarkersData().map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                title={marker.name}
              />
            ))}
          </GoogleMap>
        </div>
      )}

      {places && (
        <div
          style={{
            marginTop: "2rem",
            maxWidth: "600px",
            width: "100%",
            textAlign: "left",
            backgroundColor: "#333",
            padding: "1rem",
            borderRadius: "4px",
            overflowWrap: "break-word",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Places Result (JSON)</h2>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {JSON.stringify(places, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;

//without google maps
/*import React, { useState } from "react";
import axios from "axios";

function App() {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [radius, setRadius] = useState("");
  const [places, setPlaces] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!longitude || !latitude || !radius) {
      setError("Please enter longitude, latitude, and radius.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8070/places", {
        params: { longitude, latitude, radius },
      });
      setPlaces(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching places. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "#242424",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Nearby Places</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
          maxWidth: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              marginBottom: "0.25rem",
              fontWeight: "bold",
            }}
          >
            Longitude:
          </label>
          <input
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              marginBottom: "0.25rem",
              fontWeight: "bold",
            }}
          >
            Latitude:
          </label>
          <input
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              marginBottom: "0.25rem",
              fontWeight: "bold",
            }}
          >
            Radius (meters):
          </label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Search
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
          {error}
        </p>
      )}

      {places && (
        <div
          style={{
            marginTop: "2rem",
            maxWidth: "600px",
            width: "100%",
            textAlign: "left",
            backgroundColor: "#333",
            padding: "1rem",
            borderRadius: "4px",
            overflowWrap: "break-word",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Places Result</h2>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {JSON.stringify(places, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
*/
