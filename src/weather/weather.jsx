import React from 'react';
import './weather.css';

export function Weather(props) {

  const [forecast, setForecast] = React.useState([]);
  const[loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getWeather() {
      try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=40.2338&longitude=-111.6585&daily=weathercode,temperature_2m_max&temperature_unit=fahrenheit&timezone=auto';
      
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const formattedData = data.daily.time.map((dateStr, index) => {
          const date = new Date(dateStr + 'T00:00:00');
          const dayName = dayLabels[date.getDay()];
          const weatherCode = data.daily.weathercode[index];

          return {
            dayName: dayName,
            temperature: Math.round(data.daily.temperature_2m_max[index]),
            weather: getWeatherIcon(weatherCode)
          }
        });
        
        setForecast(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Weather fetch failed: ", error);
        setLoading(false);
      }
    }
    
    getWeather();
  }, []);

  function getWeatherIcon(code) {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";
    return "☁️";
  }

  if (loading) {
    return (
      <div className="weather-container">
        <h2 className="weather-title">Checking the weather...</h2>
      </div>
    );
  }

  return (
    <>
        <h2 className="weather-title">Weather for the week</h2>
        <div className="weather-container">
        {forecast.map((dayData, index) => (
          <div key={index}className="weather-column">
            <div className="day">{dayData.dayName}</div>
            <div className="weather-card">{dayData.weather}</div>
            <div className="temp">{dayData.temperature}°F</div>
        </div>
      ))}
        </div>
    </>
  );
}