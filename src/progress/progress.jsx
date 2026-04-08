import React from 'react';
import './progress.css';
import { NavLink } from 'react-router-dom';

const getPastDays = () => {
  const days = [];
  for (let i = 0; i < 28; i++) {
    const date = new Date();
    date.setHours(0, 0, 0, 0); 
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
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

export function Progress({ userName }) {
  React.useEffect(() => {
    async function loadProgress() {
      const response = await fetch('/api/sleep', { credentials: "include" });

      if (response.ok) {
        const data = await response.json();
        setSleepLogs(data.logs || {});
        setGoal(data.goal || 8);
      }
    }

    loadProgress();
  }, []);

  const daysList = getPastDays();
  const [goal, setGoal] = React.useState(8);
  const [sleepLogs, setSleepLogs] = React.useState({});
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [hoursInput, setHoursInput] = React.useState("");

  const handleSave = async () => {
    if (!hoursInput) return;
    const hours = Number(hoursInput);

    if (hours < 0 || hours > 24) {
      alert("Sleep hours must be between 0 and 24.");
      return;
    }

    const updatedLogs = { ...sleepLogs, [selectedDate]: hours };

    let currentStreak = 0;
    for (let date of daysList) {
      const logHours = updatedLogs[date];
      if (logHours !== undefined && logHours >= goal) {
        currentStreak++;
      } else {
        break;
      }
    }

    const response = await fetch('/api/sleep', {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: selectedDate,
        hours: hours,
        streak: currentStreak
      })
    });

    if (response.ok) {
      setSleepLogs(updatedLogs);

      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

      socket.onopen = () => {
        const cleanedName = userName ? userName.split('@')[0] : "A friend";
        const payload = {
          text: `🔥 ${cleanedName} just hit a ${currentStreak} day streak!`
        };
        socket.send(JSON.stringify(payload));
        setTimeout(() => socket.close(), 1000);
      }
    }

    setSelectedDate(null);
    setHoursInput("");
  }

  const calculateStreak = () => {
    let count = 0;

    for (let date of daysList) {
      const hours = sleepLogs[date];

      if (hours !== undefined && hours >= goal) {
        count ++
      }
      else {
        break;
      }
    }
    return count;
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
                <div key={dateString} className={`card ${status}`} onClick={() => setSelectedDate(dateString)}>
                  <div className="date">{formatDate(dateString)}</div>
                  <div className="hours">{hours !== undefined ? `${hours} hours` : "--"}</div>
                </div>
              );
            })}
        </div>
        <div id="streak">Streak: {calculateStreak()}</div>

        {selectedDate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 id="progress-header">{formatDate(selectedDate)}</h2>
            <button id="button" onClick={() => setSelectedDate(null)}>✖️</button>
            <input className="form-control" id="start" type="number" placeholder="hours" min="0" max="24" value={hoursInput} onChange={(e) => setHoursInput(e.target.value)}></input>
            <button type="submit" className="btn" id="save" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </>
  );
}