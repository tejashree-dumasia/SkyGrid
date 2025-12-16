import { useState } from 'react';

const api = {
    key: import.meta.env.VITE_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
}

// ... imports and api object

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // New State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);

    try {
      // 1. Define both URLs
      const weatherUrl = `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`;
      const forecastUrl = `${api.base}forecast?q=${city}&units=metric&APPID=${api.key}`;

      // 2. Fetch both at the same time
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      // 3. Check for errors
      if (weatherData.cod !== 200) throw new Error(weatherData.message);
      if (forecastData.cod !== "200") throw new Error(forecastData.message);

      // 4. Process Current Weather
      setWeather({
        name: weatherData.name,
        country: weatherData.sys.country,
        temp: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        tempMin: Math.round(weatherData.main.temp_min),
        tempMax: Math.round(weatherData.main.temp_max),
        pressure: weatherData.main.pressure,
        visibility: (weatherData.visibility / 1000).toFixed(1),
        sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        condition: weatherData.weather[0].main,
        humidity: `${weatherData.main.humidity}%`,
        wind: `${weatherData.wind.speed} km/h`
      });

      // 5. Process Forecast (The tricky part)
      // The API gives us data for every 3 hours (00:00, 03:00, 06:00...).
      // We want to grab the data for 12:00 PM (Noon) each day to represent the "day's weather".
      const dailyData = forecastData.list.filter(reading => reading.dt_txt.includes("12:00:00"));
      
      setForecast(dailyData);

      // Background logic
      if (weatherData.main.temp > 16) {
        document.body.classList.add('warm');
      } else {
        document.body.classList.remove('warm');
      }

    } catch (err) {
      setError('City not found. Please try again.');
      document.body.classList.remove('warm');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, loading, error, fetchWeather };
};