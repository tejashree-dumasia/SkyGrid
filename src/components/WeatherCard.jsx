import { dateBuilder } from '../utils/dateBuilder';
import { motion } from 'framer-motion';
import { 
  WiHumidity, WiStrongWind, WiDaySunny, WiCloud, WiRain, WiSnow, 
  WiThermometer, WiBarometer, WiSunrise, WiSunset, WiDust 
} from 'react-icons/wi';

// Helper to pick the right icon
const getWeatherIcon = (condition) => {
  const main = condition.toLowerCase();
  if (main.includes('cloud')) return <WiCloud />;
  if (main.includes('rain')) return <WiRain />;
  if (main.includes('snow')) return <WiSnow />;
  return <WiDaySunny />;
};

const WeatherCard = ({ weather }) => {
  return (
    <motion.div 
      className="weather-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 1. Main Overview Card */}
      <div className="glass-card main-card">
        <div className="date">{dateBuilder(new Date())}</div>
        <h2>{weather.name}, {weather.country}</h2>
        
        <div className="main-temp-layout">
            <div className="icon-large">
                {getWeatherIcon(weather.condition)}
            </div>
            <div>
                <div className="temp">{weather.temp}°</div>
                <div className="condition">{weather.condition}</div>
                <div className="high-low">H: {weather.tempMax}°  L: {weather.tempMin}°</div>
            </div>
        </div>
      </div>
      
      {/* 2. The "SkyGrid" Details */}
      <div className="details-grid">
        
        {/* Feels Like */}
        <motion.div className="detail-card glass-card" whileHover={{ scale: 1.05 }}>
          <WiThermometer size={30} />
          <h3>Feels Like</h3>
          <p>{weather.feelsLike}°</p>
        </motion.div>

        {/* Humidity */}
        <motion.div className="detail-card glass-card" whileHover={{ scale: 1.05 }}>
          <WiHumidity size={30} />
          <h3>Humidity</h3>
          <p>{weather.humidity}</p>
        </motion.div>
        
        {/* Wind */}
        <motion.div className="detail-card glass-card" whileHover={{ scale: 1.05 }}>
          <WiStrongWind size={30} />
          <h3>Wind</h3>
          <p>{weather.wind}</p>
        </motion.div>

        {/* Visibility */}
        <motion.div className="detail-card glass-card" whileHover={{ scale: 1.05 }}>
          <WiDust size={30} />
          <h3>Visibility</h3>
          <p>{weather.visibility} km</p>
        </motion.div>

        {/* Pressure */}
        <motion.div className="detail-card glass-card" whileHover={{ scale: 1.05 }}>
          <WiBarometer size={30} />
          <h3>Pressure</h3>
          <p>{weather.pressure} hPa</p>
        </motion.div>

        {/* Sunrise/Sunset (Dynamic based on time could be cool, but let's show sunset for now) */}
        <motion.div className="detail-card glass-card" whileHover={{ scale: 1.05 }}>
          <WiSunset size={30} />
          <h3>Sunset</h3>
          <p>{weather.sunset}</p>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default WeatherCard;