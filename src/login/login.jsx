import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  return (
    <main className="center-layout login">
        <h1>Changing sleep habits one day at a time.</h1>
        <form method="get" action="/track">
            <div className="input-group mb-3">
                <span className="input-group-text">Username</span>
                <input className="form-control" type="text" placeholder="your@email.com"></input>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input className="form-control" type="text" placeholder="password"></input>
            </div>
            <div class="form">
                <button type="submit" className="btn btn-primary" onClick={useNavigate("/track")}>Login</button>
                <button type="submit" className="btn btn-secondary" onClick={useNavigate("/track")}>Create</button>
            </div>
        </form>
    </main>
  );
}