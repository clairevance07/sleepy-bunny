import React from 'react';
import './track.css';

export function Track() {
  return (
    <main className="container-fluid text-center">
        <div id="greeting">Hi Claire!</div>
        <div className="page-content">
            <div className="bunny">
                <div id="head"></div>
                <div id="ear1"></div>
                <div id="ear2"></div>
                <div id="eye1"></div>
                <div id="eye2"></div>
                <div id="nose"></div>
            </div>
            
            <div className="sidebar">
                <a id="progress" href="progress.html">Progress</a>
                <a id="goal" href="goal.html">Goal</a>
            </div>
        </div>
    </main>
  );
}