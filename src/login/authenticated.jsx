import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
    const navigate = useNavigate();

    async function logout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        localStorage.removeItem('userName');
        props.onLogout();
    }

    return (
        <div>
            <div className='playerName'>{`Welcome, ${props.userName}!`}</div>
            <div className='buttons'>
            <Button variant='primary' onClick={() => navigate('/track')}>
                Track
            </Button>
            <Button variant='secondary' onClick={() => logout()}>
                Logout
            </Button>
            </div>
        </div>
    )
}