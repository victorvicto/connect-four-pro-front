import Player from './Player';
import io from 'socket.io-client';

class OnlinePlayer extends Player {
    constructor(name, chipsStyle = null, gameId) {
        super(name, chipsStyle);
        this.socket = io('http://localhost:3001');
        this.gameId = gameId;
        this.resolveMove = null;

        this.socket.on('connect', () => {
            this.socket.emit('joinGame', gameId);
        });

        this.socket.on('moveMade', (col) => {
            if (this.resolveMove) {
                this.resolveMove(col);
                this.resolveMove = null;
            }
        });
    }

    pickMove(board) {
        return new Promise((resolve) => {
            this.resolveMove = resolve;
        });
    }

    handleClick(col) {
        this.socket.emit('makeMove', { gameId: this.gameId, col });
    }
}

export default OnlinePlayer;