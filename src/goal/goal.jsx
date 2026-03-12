import React from 'react';
import './goal.css';
import { NavLink } from 'react-router-dom';

export function Goal() {

  const [sleepGoal, setSleepGoal] = React.useState(8);
  const[inputValue, saveInputValue] = React.useState("");

  React.useEffect(() => {
    loadGoal();
  }, []);

  async function loadGoal() {
    const response = await fetch('/api/sleep');
    const data = await response.json();
    setSleepGoal(data.goal);
  }

  const saveGoal = async () => {
    const goal = Number(inputValue);

    if (inputValue.trim() === "") {
      alert("Please enter a sleep goal!");
      return;
    }

    if (goal > 24) {
      alert("Sorry, but you can't sleep longer than the hours in the day...")
      return;
    }

    if (goal < 0) {
      alert("Sleep goal cannot be negative.");
      return;
    }

    const response = await fetch('/api/goal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal })
    });

    if (!response.ok) {
      alert("Failed to update goal.");
      return;
    }

    setSleepGoal(goal);
    saveInputValue("");

    if (goal < 8) {
      alert("Sleep goal updated successfully. It'd be in your best interest to get at least 8 hours.");
    }
    else {
      alert("Sleep goal updated successfully! 🐰")
    }
  }

  return (
    <>
        <NavLink id="exit" to="../track">✖️</NavLink>
        <h2 id="h2">Goal</h2>
        <div className = "window" id="current">Current goal: {sleepGoal} hours</div>
        <span className="window" id="update">Update goal </span>
        <div className="information">
            <input className="form-control" id="start" type="number" placeholder="hours" value={inputValue} onChange={(e) => saveInputValue(e.target.value)}></input>        
        </div>
        <div>
        <button type="submit" className="btn btn-primary" id="save" onClick={saveGoal}>Save goal</button>
        </div>
    </>
  );
}