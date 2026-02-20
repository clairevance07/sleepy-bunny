import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  console.log("1. Current authState value:", authState);
  console.log("2. Type of authState:", typeof authState);
  console.log("3. Comparing to:", AuthState.Unauthenticated);
  return (
    <main className="center-layout login">
        {authState !== AuthState.Authenticated && <h1>Changing sleep habits one day at a time.</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unknown && <p>Determining auth status...</p>}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
    </main>
  );
}