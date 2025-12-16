import { motion } from 'framer-motion';
import { WiDaySunny, WiCloud, WiRain, WiSnow } from 'react-icons/wi';

const getWeatherIcon = (condition) => {
  const main = condition.toLowerCase();
  if (main.includes('cloud')) return <WiCloud size={40} />;
  if (main.includes('rain')) return <WiRain size={40} />;
  if (main.includes('snow')) return <WiSnow size={40} />;
  return <WiDaySunny size={40} />;
};

const ForecastList = ({ forecast }) => {
  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => {
          // Format Date (e.g., "Mon 15")
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          const dayNum = date.getDate();

          return (
            <motion.div 
              key={index} 
              className="forecast-card glass-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }} // Staggered animation
            >
              <p className="f-date">{dayName} {dayNum}</p>
              <div className="f-icon">
                 {getWeatherIcon(day.weather[0].main)}
              </div>
              <p className="f-temp">{Math.round(day.main.temp)}°C</p>
              <p className="f-desc">{day.weather[0].main}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastList;