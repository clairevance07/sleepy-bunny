import React from 'react';
import './progress.css';
import { NavLink } from 'react-router-dom';

export function Progress() {
  return (
        <>
        <NavLink id="exit" to="../track">✖️</NavLink>
        <h2 id="overview">Progress</h2>
        <div className="container">
            <div className="day-header">Sun</div>
            <div className="day-header">Mon</div>
            <div className="day-header">Tue</div>
            <div className="day-header">Wed</div>
            <div className="day-header">Thu</div>
            <div className="day-header">Fri</div>
            <div className="day-header">Sat</div>
            <div className="card">1</div>
            <div className="card">2</div>
            <div className="card">3</div>
            <div className="card">4</div>
            <div className="card">5</div>
            <div className="card">6</div>
            <div className="card">7</div>
            <div className="card">8</div>
            <div className="card">9</div>
            <div className="card">10</div>
            <div className="card">11</div>
            <div className="card">12</div>
            <div className="card">13</div>
            <div className="card">14</div>
            <div className="card">15</div>
            <div className="card">16</div>
            <div className="card">17</div>
            <div className="card">18</div>
            <div className="card">19</div>
            <div className="card">20</div>
            <div className="card">21</div>
            <div className="card">22</div>
            <div className="card">23</div>
            <div className="card">24</div>
            <div className="card">25</div>
            <div className="card">26</div>
            <div className="card">27</div>
            <div className="card">28</div>
        </div>
        <div id="streak">Streak: 1</div>
    </>
  );
}