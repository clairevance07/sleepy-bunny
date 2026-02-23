import React from 'react';
import './weather.css';

export function Weather(props) {
  const [forecast, setForecast] = React.useState([
    { dayName: "Sun", weather: "...", temperature: "..." },
    { dayName: "Mon", weather: "...", temperature: "..." },
    { dayName: "Tue", weather: "...", temperature: "..." },
    { dayName: "Wed", weather: "...", temperature: "..." },
    { dayName: "Thu", weather: "...", temperature: "..." },
    { dayName: "Fri", weather: "...", temperature: "..." },
    { dayName: "Sat", weather: "...", temperature: "..." },
  ]);

  React.useEffect(() => {
    const placeholderData = [
      { dayName: "Sun", weather: "☁️", temperature: 60 },
      { dayName: "Mon", weather: "☀️", temperature: 70 },
      { dayName: "Tue", weather: "⛅", temperature: 66 },
      { dayName: "Wed", weather: "⛅", temperature: 65 },
      { dayName: "Thu", weather: "🌧️", temperature: 50 },
      { dayName: "Fri", weather: "🌧️", temperature: 55 },
      { dayName: "Sat", weather: "☁️", temperature: 60 },
    ];

    setForecast(placeholderData);
  }, []);

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