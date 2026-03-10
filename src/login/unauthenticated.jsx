import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    if (!userName.includes('@')) {
        setDisplayError("Please enter a valid email.");
        return;
    }
    
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        email: userName,
        password: password
        })
    });

    if (response.ok) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    } else {
        const body = await response.json();
        setDisplayError(`Error: ${body.msg}`);
    }
    }

  async function createUser() {
    const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        email: userName,
        password: password
        })
    });

    if (response.ok) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    } else {
        const body = await response.json();
        setDisplayError(`Error: ${body.msg}`);
    }
    }

  return (
    <main className="center-layout login">
        <form method="get" action="/track">
            <div className="input-group mb-3">
                <span className="input-group-text">Email</span>
                <input className="form-control" type="email" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com"></input>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password"></input>
            </div>
            <div className="form">
                <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
                    Login
                </Button>
                <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
                    Create
                </Button>
            </div>
        </form> 
        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </main>
  );
}
