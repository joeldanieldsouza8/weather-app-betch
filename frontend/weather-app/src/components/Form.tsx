import axios from "axios";
import React, { useState } from "react";
import WeatherData from "./WeatherData";
import Error from "./Error";

const Form = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.get(
      `http://localhost:8000/weather?city=${city}`
    );

    if (response.data.error) {
      setError(response.data.error);
      return;
    }

    setWeatherData(response.data); // Store the weather data in state
    setCity(""); // Clear the input field
    setError(""); // Clear any previous error
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setWeatherData(null); // Clear the weather data
    setError(""); // Clear any previous error
  };

  return (
    <>
      <h1 className="header">Weather App</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            placeholder="Enter city name..."
            onChange={handleCityChange}
          />
          <button type="submit">Get Weather</button>
        </form>

        {error && <Error message={error} />}
        <WeatherData weatherData={weatherData} />
      </div>
    </>
  );
};

export default Form;
