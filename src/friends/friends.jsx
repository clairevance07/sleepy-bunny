import React from 'react';
import './friends.css';

export function Friends() {
    
    const [friendsList, setFriendsList] = React.useState(() => {
        const savedFriends = localStorage.getItem("userFriends");
        return savedFriends ? JSON.parse(savedFriends) : [];
    });

    const [friendCode, setFriendCode] = React.useState("");

    React.useEffect(() => {
        localStorage.setItem('userFriends', JSON.stringify(friendsList));
    }, [friendsList]);

    const users = {
        "ABC" : "Kaitlyn",
        "DEF" : "Hallie",
        "GHI" : "Maddie",
        "JKL" : "Katelyn",
        "MNO" : "Beyonce",
        "PQR" : "Chase",
        "STU" : "Mason"
    }

    const handleAddFriends = () => {
        const upperCode = friendCode.toUpperCase();

        if (friendsList.length >= 6) {
            alert("You can only have 6 friends!");
            return;
        }

        const nameFound = users[upperCode]

        if (nameFound) {
            if (friendsList.some(friend => friend.code === upperCode)) {
                alert("You've already added this friend!");
                setFriendCode("");
                return;
            }
            setFriendsList([...friendsList, {name : nameFound, code : upperCode, streak: 0}]);
            setFriendCode("");
            }
        else {
                alert("Invalid Code!");
                setFriendCode("");
        }
    }

    return (
        <div>
        <div className="friends-page">
            <div className = "friends-grid">
                {friendsList.map((friend, index) => (
                    <div className="friend-card" key={index}>
                        <div className="bunny">🐰</div>
                        <div className="friend-name">{friend.name}</div>
                        <div className="streak">Streak: {friend.streak}</div>
                        <button type="submit" className="btn send">🙌</button>
                    </div>  
                ))}
            </div>
        </div>

        <div className="add-friend">
            <input className="form-control" id="field" type="text" placeholder="Insert friend code" value={friendCode} onChange={(e) => setFriendCode(e.target.value)}></input>
            <button onClick={handleAddFriends} type="button" className="btn send" id="add">Add friend</button>
        </div>   
    </div>
  );
}