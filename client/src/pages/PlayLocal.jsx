import React from 'react';
import { useState } from 'react';
import OfflineGame from '../components/OfflineGame';
import FatButton from '../components/FatButton';
import OfflinePlayer from '../utils/OfflinePlayer';
import { RandomBot, BalancedBot } from '../utils/bots';

function PlayLocal() {
    const [opponent, setOpponent] = useState(null);

    const content = opponent ? (
        <OfflineGame opponent={opponent} />
    ) : (
        <div>
            <FatButton label="Pass and Play" onClick={() => setOpponent(new OfflinePlayer("Player 2"))} />
            <FatButton label="Tim (Bot)" onClick={() => setOpponent(new RandomBot("Tim"))} />
            <FatButton label="Charlotte (Bot)" onClick={() => setOpponent(new BalancedBot("Charlotte"))} />
        </div>
    );

    return content;
};

export default PlayLocal;