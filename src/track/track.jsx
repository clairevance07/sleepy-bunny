import React from 'react';
import './track.css';
import { NavLink } from 'react-router-dom';

export function Track() {
    
    const [sleepHours, setSleepHours] = React.useState(() => {
    const today = new Date().toLocaleDateString('en-CA'); 
    const rawData = localStorage.getItem('sleepLog');
    if (!rawData) return 0;

    const logs = JSON.parse(rawData);
    return logs[today] !== undefined ? Number(logs[today]) : 0;
});

  React.useEffect(() => {
    const handleStorageChange = () => {
      const logs = JSON.parse(localStorage.getItem('sleepLog')) || {};
      const dates = Object.keys(logs);
      if (dates.length > 0) {
        const mostRecentDate = dates.sort().pop();
        setSleepHours(Number(logs[mostRecentDate]));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

    const getBunnyImage = () => {
        if (sleepHours === 0) return "/normal-bunny.png";
        if (sleepHours < 4) return "/sleeping-bunny.png";
        if (sleepHours < 6) return "/laying-down-bunny.png";
        if (sleepHours < 8) return "/droopy-bunny.png";
        if (sleepHours < 10) return "/normal-bunny.png";
        if (sleepHours >= 10) return "/standing-bunny.png";
        return "/normal-bunny.png";
    };

  return (
    <div className="container-fluid text-center track-page">
        <div className="sleep-stat">Last night, you slept {sleepHours} hours!</div>
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