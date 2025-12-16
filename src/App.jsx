import { useWeather } from './hooks/useWeather';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList'; // Import New Component
import './App.css';

function App() {
  // Grab 'forecast' from the hook now
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  return (
    <div className="app-container">
      <header className="header">
        <h1>SkyGrid</h1>
      </header>

      <SearchBox onSearch={fetchWeather} />

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2rem' }}>
          Searching the skies... 🛰️
        </div>
      )}
      
      {error && (
        <div style={{ color: '#ffb3b3', textAlign: 'center', marginTop: '20px', background: 'rgba(255,0,0,0.2)', padding: '10px', borderRadius: '10px' }}>
          {error}
        </div>
      )}

      {/* Render Current Weather AND Forecast */}
      {weather && !loading && (
        <>
          <WeatherCard weather={weather} />
          
          {/* Only show forecast if we have it */}
          {forecast && <ForecastList forecast={forecast} />}
        </>
      )}
    </div>
  )
}

export default App;