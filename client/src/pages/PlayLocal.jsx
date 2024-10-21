import React from 'react';
import { useState } from 'react';
import OfflineGame from '../components/OfflineGame';

function PlayLocal() {
    const [mode, setMode] = useState('pvp');
    return (
        <>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={mode === 'bot'}
                        onChange={() => setMode(mode === 'pvp' ? 'bot' : 'pvp')}
                    />
                    {mode === 'pvp' ? 'Pass and Play' : 'Play with Bot'}
                </label>
                <OfflineGame mode={mode} />
            </div>
        </>
    );
};

export default PlayLocal;