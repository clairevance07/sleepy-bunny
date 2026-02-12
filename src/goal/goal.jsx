import React from 'react';
import './goal.css';

export function Goal() {
  return (
    <>
        <a id="exit" href="track.html">✖️</a>
        <h2 id="h2">Goal</h2>
        <span id="window">Sleep window:</span>
        <div className="information">
            <input className="form-control" id="start" type="text" placeholder="Start time"></input>
            to 
            <input className="form-control" id="end" type="text" placeholder="End time"></input>          
        </div>
        <div>
        <button type="submit" className="btn btn-primary" id="save">Save goal</button>
        </div>
    </>
  );
}