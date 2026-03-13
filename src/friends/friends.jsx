import React from 'react';
import './friends.css';

const MY_FRIEND_CODE = "XYZ";

export function Friends() {

    const [friendsList, setFriendsList] = React.useState([]);
    const [friendCode, setFriendCode] = React.useState("");
    const [notifications, setNotifications] = React.useState([]);

const removeFriend = async (code) => {
    // BUG #2 FIX: Find name before deleting
    const friend = friendsList.find(f => f.code === code);
    const friendName = friend ? friend.name : code;

    const response = await fetch(`/api/friends/remove/${code}`, { method: 'DELETE' });

    if (response.ok) {
        setFriendsList(prev => prev.filter(f => f.code !== code));

        const id = Date.now();
        const text = `Friend ${friendName} removed.`;
        
        fetch('/api/notifications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const newNote = { id, text };
        setNotifications(prev => [newNote, ...prev].slice(0, 5));
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
    }
};

const sendHighFive = async (name) => {
    const id = Date.now();
    const text = `You sent a high five to ${name}!`;

    fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    const newNote = { id, text };
    setNotifications(prev => [newNote, ...prev].slice(0, 5));

    setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
};

    React.useEffect(() => {
        async function loadFriends() {
            const response = await fetch('/api/friends');
            const data = await response.json();
            setFriendsList(data);
        }

        loadFriends();
    }, []);

    React.useEffect(() => {
        if (friendsList.length === 0) return;

        const messages = [
            "sent you a high five! 🙌",
            "is active now! 🐰",
            "increased their streak! 🔥",
        ];

        const interval = setInterval(() => {
            const randomFriend = friendsList[Math.floor(Math.random() * friendsList.length)];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            const id = Date.now();
            const newNote = { id, text: `${randomFriend.name} ${randomMsg}` };

            setNotifications(prev => [newNote, ...prev].slice(0, 5));

            setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.id !== id));
            }, 4000);
        }, 8000);

        return () => clearInterval(interval);
    }, [friendsList]);

    const handleAddFriends = async () => {
        const upperCode = friendCode.toUpperCase();

        const response = await fetch(`/api/friends/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ friendCode: upperCode })
        });

        if (!response.ok) {
            alert("Invalid Code or already added!");
            return;
        }

        const updated = await fetch('/api/friends');
        const data = await updated.json();
        setFriendsList(data);

        setFriendCode("");
    };

    return (
        <div className="friends-container">
            <div className="friends-sidebar">
                <h3 className="sidebar-title">Activity</h3>
                <div className="notifications">
                    {notifications.length === 0 ? (
                        <p className="empty-msg">Your inbox is empty!</p>
                    ) : (
                        notifications.map((note) => (
                            <div key={note.id} className="notification-item">
                                {note.text}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="friends-page">
                <div className="friends-grid">
                    {friendsList.map((friend) => (
                        <div className="friend-card" key={friend.code}>
                            <button 
                                className="btn remove-btn"
                                onClick={() => removeFriend(friend.code)}
                                title="Remove Friend">
                                ✖️
                            </button>
                            <div className="friend-bunny">🐰</div>
                            <div className="friend-name">{friend.name}</div>
                            <div className="friend-stats">
                                <div className="streak">🔥 {friend.streak || 0} days</div>
                                <div className="sleep">💤 {friend.sleep || "7.0h"}</div>
                            </div>
                            <button type="button" className="btn send" onClick={() => sendHighFive(friend.name)}>🙌</button>
                        </div>
                    ))}
                </div>
                
                <div className="add-friend">
                    <input 
                        className="form-control" 
                        id="field" 
                        type="text" 
                        placeholder="Insert friend code" 
                        value={friendCode} 
                        onChange={(e) => setFriendCode(e.target.value)} 
                    />
                    <div className="personal-code">Your friend code is: <strong>{MY_FRIEND_CODE}</strong></div>
                    <button onClick={handleAddFriends} type="button" className="btn send" id="add">Add friend</button>
                </div>
            </div>
        </div>
    );
}