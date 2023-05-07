import "./App.css";
import Search from "./components/search/search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value;
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?appid=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?appid=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (res) => {
        const currentWeatherResponse = await res[0].json();
        const forcastResponse = await res[1].json();
        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
