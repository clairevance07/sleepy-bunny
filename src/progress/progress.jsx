import React from 'react';
import './progress.css';
import { NavLink } from 'react-router-dom';

const getPastDays = () => {
    const days = [];
    for (let i = 0; i < 28; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0])
    }
    return days;
  }

export function Progress() {

  const daysList = getPastDays();
  const goal = Number(localStorage.getItem('sleepGoal')) || 8;
  const [sleepLogs, setSleepLogs] = React.useState(() => {
    return JSON.parse(localStorage.getItem('sleepLog')) || {};
  });
  const [selectedDate, setSelectedDate] = React.useState(null);

  return (
        <>
        <NavLink id="exit" to="../track">✖️</NavLink>
        <h2 id="overview">Progress</h2>
        <div className="container">
            {daysList.map((dateString) => {
              const hours = sleepLogs[dateString]

              let status = "empty";

              if (hours !== undefined) {
                if (hours < goal) {
                  status = "under"
                }
                else {
                  status = "reached"
                }
              }

              return (
                <div className={`card ${status}`} onClick={() => setSelectedDate(dateString)}>{dateString}</div>
              );
            })}
        </div>
        <div id="streak">Streak: 1</div>

        {selectedDate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 id="progress-header">{selectedDate}</h2>
            <button id="button" onClick={() => setSelectedDate(null)}>✖️</button>
            <input className="form-control" id="start" type="number" placeholder="hours"></input>
          </div>
        </div>
      )}
    </>
  );
}