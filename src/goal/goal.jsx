import React from 'react';
import './goal.css';
import { NavLink } from 'react-router-dom';

export function Goal(props) {

  const [sleepGoal, setSleepGoal] = React.useState(localStorage.getItem('sleepGoal') || 8);

  const[inputValue, saveInputValue] = React.useState("");

  const saveGoal = () => {
    
  }

  const handleGoalChange = (event) => {
    const newGoal = event.target.value;
    setSleepGoal(newGoal);
    localStorage.setItem('sleepGoal', JSON.stringify(newGoal))
  }

  return (
    <>
        <NavLink id="exit" to="../track">✖️</NavLink>
        <h2 id="h2">Goal</h2>
        <div className = "window" id="current">Current goal: {sleepGoal} hours</div>
        <span className="window" id="update">Update goal </span>
        <div className="information">
            <input className="form-control" id="start" type="text" placeholder="hours"></input>        
        </div>
        <div>
        <button type="submit" className="btn btn-primary" id="save">Save goal</button>
        </div>
    </>
  );
}