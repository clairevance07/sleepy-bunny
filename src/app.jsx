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
import { AuthState } from './login/authState';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

  return ( <BrowserRouter>
    <div className="body">
    <header className="container-fluid">
        <nav className="navbar fixed-top navbar-light">
            <h1 className="navbar-brand">Sleepy Bunny</h1>
            <menu className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link active" to="">Login</NavLink>
                </li>
                {authState === AuthState.Authenticated && (
                <li className="nav-item">
                    <NavLink className="nav-link active" to="track">Track</NavLink>
                </li>
                )}
                {authState === AuthState.Authenticated && (
                <li className="nav-item">
                    <NavLink className="nav-link active" to="friends">Friends</NavLink>
                </li>
                )}
                <li className="nav-item">
                    <NavLink className="nav-link active" to="weather">Weather</NavLink>
                </li>
            </menu>
    </nav>
    </header>

    <main>
    <Routes>
        <Route path='/' element={<Login userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}/>} exact />
        <Route path='/track' element={<Track />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/weather' element={<Weather />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/goal' element={<Goal />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
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

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export default App;