import Player from './Player';

class LocalPlayer extends Player {
    constructor(name, chipsStyle=null) {
        super(name, chipsStyle);
        this.resolveMove = null;
    }

    pickMove(board) {
        return new Promise((resolve) => {
            this.resolveMove = resolve;
        });
    }

    handleClick(col) {
        if (this.resolveMove) {
            this.resolveMove(col);
            this.resolveMove = null;
        }
    }
}

class LocalOnlinePlayer extends LocalPlayer {
    constructor(name, chipsStyle=null, socket, gameId) {
        super(name, chipsStyle);
        this.socket = socket;
        this.resolveMove = null;
        this.gameId = gameId;
    }

    pickMove(board) {
        return new Promise((resolve) => {
            this.resolveMove = resolve;
        });
    }

    handleClick(col) {
        if (this.resolveMove) {
            this.resolveMove(col);
            this.resolveMove = null;
            this.socket.emit('makeMove', { gameId : this.gameId, col : col });
        }
    }
}

export { LocalPlayer, LocalOnlinePlayer };