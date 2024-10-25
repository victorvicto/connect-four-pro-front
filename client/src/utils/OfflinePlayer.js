import Player from './Player';

class OfflinePlayer extends Player {
    constructor() {
        super();
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

export default OfflinePlayer;