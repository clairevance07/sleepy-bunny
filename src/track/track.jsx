import React from 'react';
import './track.css';
import { NavLink } from 'react-router-dom';

export function Track() {
    
  const [sleepHours, setSleepHours] = React.useState(null);

  React.useEffect(() => {
    async function loadSleep() {
      const response = await fetch('/api/sleep');

      if (response.ok) {
        const data = await response.json();
        const logs = data.logs || {};

        const dates = Object.keys(logs);

        if (dates.length > 0) {
          const mostRecentDate = dates.sort().pop();
          setSleepHours(Number(logs[mostRecentDate]));
        }
      }
    }

    loadSleep();
  }, []);

    const getBunnyImage = () => {
        if (sleepHours === null) return "/normal-bunny.png";
        if (sleepHours < 4) return "/sleeping-bunny.png";
        if (sleepHours < 6) return "/laying-down-bunny.png";
        if (sleepHours < 8) return "/droopy-bunny.png";
        if (sleepHours < 10) return "/normal-bunny.png";
        if (sleepHours >= 10) return "/standing-bunny.png";
        return "/normal-bunny.png";
    };

  return (
    <div className="container-fluid text-center track-page">
        <div className="sleep-stat">{sleepHours === null
    ? "You haven't logged sleep yet!"
    : `Last night, you slept ${sleepHours} hours!`}</div>
        <div className="page-content">
            <div className="bunny-container">
                <img 
                    src={getBunnyImage()} 
                    alt="Your current bunny" 
                    className="bunny-img" 
                />
            </div>
            <div className="sidebar">
                <NavLink id="progress" to="../progress">Progress</NavLink>
                <NavLink id="goal" to="../goal">Goal</NavLink>
            </div>
        </div>
    </div> 
  );
}