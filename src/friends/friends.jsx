import React from 'react';
import './friends.css';

export function Friends() {
  return (
    <>
        <div className="friends">
            <div className="friend1">
            <div className="bunny">
                <div className="head"></div>
                <div className="ear1"></div>
                <div className="ear2"></div>
                <div className="eye1"></div>
                <div className="eye2"></div>
                <div className="nose"></div>
            </div>
            <div className="name">Kaitlyn</div>
            <div className="streak">Streak: 10</div>
            <button type="submit" className="btn send">Send high five!</button>
            </div>
            <div className="friend2">
            <div className="bunny">
                <div className="head"></div>
                <div className="ear1"></div>
                <div className="ear2"></div>
                <div className="eye1"></div>
                <div className="eye2"></div>
                <div className="nose"></div>
            </div>
            <div className="name">Hallie</div>
            <div className="streak">Streak: 10</div>
            <button type="submit" className="btn send">Send high five!</button>
            </div>
        </div>   
            <div className="add-friend">
                <input className="form-control" id="field" type="text" placeholder="Insert friend username"></input>
            <button type="submit" className="btn send" id="add">Add friend</button>
            </div>
    </>
  );
}