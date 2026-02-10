import React from 'react';
import './weather.css';

export function Weather() {
  return (
    <>
        <h2 className="weather-title">Weather for the week</h2>
        <div className="container">
            <div className="day-header">Sun</div>
            <div className="day-header">Mon</div>
            <div className="day-header">Tue</div>
            <div className="day-header">Wed</div>
            <div className="day-header">Thu</div>
            <div className="day-header">Fri</div>
            <div className="day-header">Sat</div>
            <div className="card">☁️</div>
            <div className="card">☀️</div>
            <div className="card">⛅</div>
            <div className="card">⛅</div>
            <div className="card">🌧️</div>
            <div className="card">🌧️</div>
            <div className="card">☁️</div>
            <div className="day-header" id="temp">60</div>
            <div className="day-header" id="temp">70</div>
            <div className="day-header" id="temp">66</div>
            <div className="day-header" id="temp">65</div>
            <div className="day-header" id="temp">50</div>
            <div className="day-header" id="temp">55</div>
            <div className="day-header" id="temp">60</div>
        </div>
    </>
  );
}