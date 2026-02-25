import React from 'react';
import './friends.css';

export function Friends() {
    
    const [friendsList, setFriendsList] = React.useState([]);
    const [friendCode, setFriendCode] = React.useState("");

    const users = {
        "ABC" : "Kaitlyn",
        "EFG" : "Hallie",
        "HIJ" : "Maddie",
        "KLM" : "Katelyn",
        "NOP" : "Beyonce"
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
                return;
            }
            setFriendsList([...friendsList, {name : nameFound, code : upperCode, streak: 0}]);
            setFriendCode("");
            }
        else {
                alert("Invalid Code!")
        }
    }

    return (
        <>
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
            <input className="form-control" id="field" type="text" placeholder="Insert friend code" onChange={(e) => setFriendCode(e.target.value)}></input>
            <button onClick={handleAddFriends} type="submit" className="btn send" id="add">Add friend</button>
        </div>   
    </>
  );
}