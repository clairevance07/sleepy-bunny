import React from 'react';
import './friends.css';

export function Friends() {
  return (
    <>
        <div className="friends">
            <div className="friend1">
            <div className="bunny">
                <div id="head"></div>
                <div id="ear1"></div>
                <div id="ear2"></div>
                <div id="eye1"></div>
                <div id="eye2"></div>
                <div id="nose"></div>
            </div>
            <div className="name">Kaitlyn</div>
            <div className="streak">Streak: 10</div>
            <button type="submit" className="btn send">Send high five!</button>
            </div>
            <div className="friend2">
            <div className="bunny">
                <div id="head"></div>
                <div id="ear1"></div>
                <div id="ear2"></div>
                <div id="eye1"></div>
                <div id="eye2"></div>
                <div id="nose"></div>
            </div>
            <div className="name">Hallie</div>
            <div className="streak">Streak: 10</div>
            <button type="submit" className="btn send">Send high five!</button>
            </div>
        </div>   
            <div className="add-friend">
                <input className="form-control" id="field" type="text" placeholder="Insert friend username"></input>
            <button type="submit" className="btn btn-primary" id="add">Add friend</button>
            </div>
    </>
  );
}