import React from 'react';
import './weather.css';

export function Weather() {
  return (
    <>
        <h2 className="weather-title">Weather for the week</h2>
        <div className="container">
            <div className="day">Sun</div>
            <div className="day">Mon</div>
            <div className="day">Tue</div>
            <div className="day">Wed</div>
            <div className="day">Thu</div>
            <div className="day">Fri</div>
            <div className="day">Sat</div>
            <div className="weather-card">☁️</div>
            <div className="weather-card">☀️</div>
            <div className="weather-card">⛅</div>
            <div className="weather-card">⛅</div>
            <div className="weather-card">🌧️</div>
            <div className="weather-card">🌧️</div>
            <div className="weather-card">☁️</div>
            <div className="temp">60</div>
            <div className="temp">70</div>
            <div className="temp">66</div>
            <div className="temp">65</div>
            <div className="temp">50</div>
            <div className="temp">55</div>
            <div className="temp">60</div>
        </div>
    </>
  );
}