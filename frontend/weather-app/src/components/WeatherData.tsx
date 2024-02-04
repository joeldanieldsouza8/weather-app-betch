import React from "react";

interface WeatherData {
  city: string;
  temperature: number;
  feels_like: number;
  description: string;
}

const WeatherData: React.FC<{ weatherData: WeatherData | null }> = ({
  weatherData,
}) => {
  if (!weatherData) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {weatherData.city}</h2>
      <p>Temperature: {weatherData.temperature}°C</p>
      <p>Feels Like: {weatherData.feels_like}°C</p>
      <p>Description: {weatherData.description}</p>
    </div>
  );
};

export default WeatherData;
