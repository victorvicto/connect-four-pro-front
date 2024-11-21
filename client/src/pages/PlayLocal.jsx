import React from 'react';
import { useState } from 'react';
import Game from '../components/Game';
import FatButton from '../components/FatButton';
import OfflinePlayer from '../utils/OfflinePlayer';
import { RandomBot, GreedyBot } from '../utils/bots';

function PlayLocal({userInfo}) {
    const [opponent, setOpponent] = useState(null);
    const [userStarts, setUserStarts] = useState(null);

    if (opponent === null) {
        return (
            <div>
                <FatButton label="Pass and Play" onClick={() => setOpponent(new OfflinePlayer("Guest Player", userInfo.chipsStyle))} />
                <FatButton label="Tim (Bot)" onClick={() => setOpponent(new RandomBot("Tim"))} />
                <FatButton label="Charlotte (Bot)" onClick={() => setOpponent(new GreedyBot("Charlotte"))} />
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
                <Game player1={new OfflinePlayer(userInfo.username, userInfo.chipsStyle)} player2={opponent} /> : 
                <Game player1={opponent} player2={new OfflinePlayer(userInfo.username, userInfo.chipsStyle)} />}
        </>
    );
};

export default PlayLocal;