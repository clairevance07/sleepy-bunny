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

const formatDate = (dateStr) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  });
};

export function Progress() {

  const daysList = getPastDays();
  const goal = Number(localStorage.getItem('sleepGoal')) || 8;
  const [sleepLogs, setSleepLogs] = React.useState(() => {
    return JSON.parse(localStorage.getItem('sleepLog')) || {};
  });
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [hoursInput, setHoursInput] = React.useState("");

  const handleSave = () => {
    if (!hoursInput) return;

    const updatedLogs = {...sleepLogs, [selectedDate]: Number(hoursInput)};
    setSleepLogs(updatedLogs);

    localStorage.setItem('sleepLog', JSON.stringify(updatedLogs));

    setSelectedDate(null);
    setHoursInput("");
  }

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
                <div className={`card ${status}`} onClick={() => setSelectedDate(dateString)}>{formatDate(dateString)}</div>
              );
            })}
        </div>
        <div id="streak">Streak: 1</div>

        {selectedDate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 id="progress-header">{formatDate(selectedDate)}</h2>
            <button id="button" onClick={() => setSelectedDate(null)}>✖️</button>
            <input className="form-control" id="start" type="number" placeholder="hours" value={hoursInput} onChange={(e) => setHoursInput(e.target.value)}></input>
            <button type="submit" className="btn" id="save" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </>
  );
}