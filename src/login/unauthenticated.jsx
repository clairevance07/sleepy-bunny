import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <main className="center-layout login">
        <h1>Changing sleep habits one day at a time.</h1>
        <form method="get" action="/track">
            <div className="input-group mb-3">
                <span className="input-group-text">Username</span>
                <input className="form-control" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com"></input>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input className="form-control" type="text" onChange={(e) => setPassword(e.target.value)} placeholder="password"></input>
            </div>
            <div class="form">
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
