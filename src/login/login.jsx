import React from 'react';

export function Login() {
  return (
    <main className="center-layout">
        <h1>Changing sleep habits one day at a time.</h1>
        <form method="get" action="track.html">
            <div className="input-group mb-3">
                <span className="input-group-text">Username</span>
                <input className="form-control" type="text" placeholder="your@email.com"></input>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input className="form-control" type="text" placeholder="password"></input>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="submit" className="btn btn-secondary">Create</button>
            </div>
        </form>
    </main>
  );
}