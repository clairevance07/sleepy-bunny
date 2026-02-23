import React from 'react';
import './goal.css';
import { NavLink } from 'react-router-dom';

export function Goal(props) {

  const [sleepGoal, setSleepGoal] = React.useState(localStorage.getItem('sleepGoal') || 8);

  const[inputValue, saveInputValue] = React.useState("");

  const saveGoal = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a sleep goal!");
      return;
    }

    setSleepGoal(inputValue);
    localStorage.setItem('sleepGoal', inputValue);

    saveInputValue("");
    if (inputValue < 8) {
      alert("Sleep goal updated successfully. You should probably aim to get more sleep than that though...")
    }
    else if (inputValue > 24) {
      alert("I don't think you're capable of sleeping longer than the hours in the day...")
    }
    else {
      alert("Sleep goal updated successfully 🐰")
    }
  }

  return (
    <>
        <NavLink id="exit" to="../track">✖️</NavLink>
        <h2 id="h2">Goal</h2>
        <div className = "window" id="current">Current goal: {sleepGoal || 8} hours</div>
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