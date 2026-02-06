import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Friends } from './friends/friends';
import { Goal } from './goal/goal';
import { Login } from './login/login';
import { Progress } from './progress/progress';
import { Track } from './track/track';
import { Weather } from './weather/weather';

export default function App() {
  return ( <BrowserRouter>
    <div>
    <header className="container-fluid">
        <nav className="navbar fixed-top navbar-light">
            <h1 className="navbar-brand">Sleepy Bunny</h1>
            <menu className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link active" href="index.html">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" href="track.html">Track</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" href="friends.html">Friends</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" href="weather.html">Weather</a>
                </li>
            </menu>
    </nav>
    </header>

    <main className="container-fluid text-center">
        <h1>stuff.</h1>
    </main>
  
    <footer className="footer">
    <div className="container-fluid">
        <span className="text-reset">Claire Vance</span>
        <a className="text-reset" href="https://github.com/clairevance07/sleepy-bunny">GitHub</a>
        </div>
    </footer>
  </div>
  </BrowserRouter>
  );
}