import Player from './Player';

class OnlinePlayer extends Player {
    constructor(name, chipsStyle = null, socket) {
        super(name, chipsStyle);
        this.socket = socket;
        this.resolveMove = null;

        this.socket.on('moveMade', (col) => {
            console.log('Move made:', col, 'by', this.name);
            // TODO: Check if the move is valid, send error if not
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
}

export default OnlinePlayer;