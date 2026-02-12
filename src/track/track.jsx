import React from 'react';
import './track.css';
import { NavLink } from 'react-router-dom';

export function Track() {
  return (
    <div className="container-fluid text-center">
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
                <NavLink id="progress" to="../progress">Progress</NavLink>
                <NavLink id="goal" to="../goal">Goal</NavLink>
            </div>
        </div>
    </div> 
  );
}