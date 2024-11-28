import React from 'react';
import { useState } from 'react';
import Game from '../components/Game';
import FatButton from '../components/FatButton';
import { LocalPlayer } from '../utils/LocalPlayer';
import { RandomBot, GreedyBot } from '../utils/bots';

function PlayLocal({userInfo}) {
    const [opponent, setOpponent] = useState(null);
    const [userStarts, setUserStarts] = useState(null);

    if (opponent === null) {
        return (
            <div>
                <FatButton label="Pass and Play" onClick={() => setOpponent(new LocalPlayer("Guest Player", userInfo.chipsStyle))} />
                <FatButton label="Tim (Bot)" onClick={() => setOpponent(new RandomBot("Tim", "nature_star"))} />
                <FatButton label="Charlotte (Bot)" onClick={() => setOpponent(new GreedyBot("Charlotte", "pirate_skull"))} />
            </div>
        );
    }

    if (userStarts === null) {
        return (
            <div>
                <h1>Who starts?</h1>
                <FatButton label={userInfo.username} onClick={() => setUserStarts(true)} />
                <FatButton label={opponent.name} onClick={() => setUserStarts(false)} />
            </div>
        );
    }

    return (
        <>
            {userStarts ? 
                <Game player1={new LocalPlayer(userInfo.username, userInfo.chipsStyle)} player2={opponent} /> : 
                <Game player1={opponent} player2={new LocalPlayer(userInfo.username, userInfo.chipsStyle)} />}
        </>
    );
};

export default PlayLocal;