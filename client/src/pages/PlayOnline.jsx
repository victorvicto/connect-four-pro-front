import React from 'react';
import io from 'socket.io-client';
import Game from '../components/Game';
import { LocalOnlinePlayer } from '../utils/LocalPlayer';
import OnlinePlayer from '../utils/OnlinePlayer';
import FatButton from '../components/FatButton';

function PlayOnline({ userInfo, setUserInfo }) {
    const [gameId, setGameId] = React.useState('');
    const [opponent, setOpponent] = React.useState(null);
    const [starts, setStarts] = React.useState(false);
    const [socket, setSocket] = React.useState(null);
    const [searching, setSearching] = React.useState(false);

    React.useEffect(() => {
        const socket = io('http://localhost:3000', { withCredentials: true });
        setSocket(socket);

        socket.on('gameFound', ({ gameId, opponent, starts }) => {
            setGameId(gameId);
            setOpponent(opponent);
            setStarts(starts);
            setSearching(false);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleFindGame = () => {
        socket.emit('findGame');
        setSearching(true);
    };

    if(searching) {
        return (
            <div>
                <p>Searching for a match...</p>
            </div>
        );
    }

    if (!gameId) {
        return (
            <div>
                <FatButton label={"Find Game"} onClick={handleFindGame} />
            </div>
        );
    }

    const localPlayer = new LocalOnlinePlayer(userInfo.username , userInfo.chipsStyle, socket, gameId);
    const remotePlayer = new OnlinePlayer(opponent.username, opponent.chipsStyle, socket, gameId);

    return (
        <Game player1={starts ? localPlayer : remotePlayer} player2={starts ? remotePlayer : localPlayer} />
    );
};

export default PlayOnline;