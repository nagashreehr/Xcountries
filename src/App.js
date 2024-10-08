import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const getData = async () => {
    try {
      let response = await axios.get('https://xcountries-backend.azurewebsites.net/all');
      setCountries(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load country data.");
      setLoading(false); // Ensure loading is false even after error
    }
  };
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Country Flags</h1>
      {loading && <p>Loading...</p>} {/* Display loading message while data is fetching */}
      {error && <p>{error}</p>}
      <div className="flags-container">
        {countries.map((country) => (
          <div key={country['abbr']} className="flag-item">
            <img
              src={country['flag']}
              alt={`Flag of ${country['name']}`}
              className="flag-img"
            />
            <p className="country-name">{country['name']}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
