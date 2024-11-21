import Player from './Player.js';

class Bot extends Player {

    getThinkingTime() {
        return 1000*Math.random()+500;
    }

    thinkOfMove(board) {
        throw new Error("Method 'thinkOfMove(board)' must be implemented.");
    }

    pickMove(board) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.thinkOfMove(board));
            }, this.getThinkingTime());
        });
    }
}

// Random Bot
class RandomBot extends Bot {
    thinkOfMove(board) {
        const validMoves = board.getValidMoves();
        return validMoves[Math.floor(Math.random() * validMoves.length)];
    }
}

// Balanced Bot
class GreedyBot extends Bot {
    thinkOfMove(board) {
        const validMoves = board.getValidMoves();
        for (let move of validMoves) {
            if (board.isWinningMove(move)) {
                return move;
            }
        }
        return validMoves[Math.floor(Math.random() * validMoves.length)];
    }
}

export { RandomBot, GreedyBot };