class Board {

    constructor(board = null, isFirstPlayerTurn = true, cols = 7, rows = 6) {
        this.cols = cols;
        this.rows = rows;
        if (board === null){
            this.board = this.createBoard();
        } else {
            this.board = board;
        }
        this.isFirstPlayerTurn = isFirstPlayerTurn;
    }

    createBoard() {
        const board = [];
        for (let i = 0; i < this.cols; i++) {
            board.push(Array(this.rows).fill(null));
        }
        return board;
    }

    getBoard() {
        return this.board;
    }

    getFirstPlayerString() {
        return 'p1';
    }

    isCellEmpty(col, row) {
        return this.board[col][row] === null;
    }

    isCellFirstPlayer(col, row) {
        return this.board[col][row] === 'p1';
    }

    playMove(col) {
        if(col < 0 || col >= this.cols) return false;
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.board[col][row]) {
                this.board[col][row] = this.isFirstPlayerTurn ? 'p1' : 'p2';
                this.isFirstPlayerTurn = !this.isFirstPlayerTurn;
                return true;
            }
        }
        return false;
    }

    checkWinner() {
        const checkDirection = (col, row, rowDir, colDir) => {
            const player = this.board[col][row];
            if (!player) return null;
            for (let i = 1; i < 4; i++) {
                const newRow = row + rowDir * i;
                const newCol = col + colDir * i;
                if (
                    newCol < 0 || newCol >= this.cols ||
                    newRow < 0 || newRow >= this.rows ||
                    this.board[newCol][newRow] !== player
                ) {
                    return false;
                }
            }
            return true;
        };

        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                if (this.board[col][row]) {
                    if (
                        checkDirection(col, row, 0, 1) || // Horizontal
                        checkDirection(col, row, 1, 0) || // Vertical
                        checkDirection(col, row, 1, 1) || // Diagonal down-right
                        checkDirection(col, row, 1, -1)   // Diagonal down-left
                    ) {
                        return this.board[col][row];
                    }
                }
            }
        }
        return null;
    }

    isDraw() {
        return this.board.every(col => col[0] !== null);
    }

    resetBoard() {
        this.board = this.createBoard();
        this.isFirstPlayerTurn = true;
    }

    getValidMoves() {
        const validMoves = [];
        for (let col = 0; col < this.cols; col++) {
            if (this.board[col][0] === null) {
                validMoves.push(col);
            }
        }
        return validMoves;
    }

    isWinningMove(col) {
        const tempBoard = this.board.map(col => col.slice());
        const player = this.isFirstPlayerTurn ? 'p1' : 'p2';
        for (let row = tempBoard.length - 1; row >= 0; row--) {
            if (tempBoard[col][row] === null) {
                tempBoard[col][row] = player;
                break;
            }
        }
        return this.checkWinner(tempBoard) === player;
    }

    // boardToIntState() {
    //     let trinary = '';
    //     for (let row of board) {
    //         for (let cell of row) {
    //             if (cell === null) {
    //                 trinary += '0';
    //             } else if (cell === 'player1') {
    //                 trinary += '1';
    //             } else if (cell === 'player2') {
    //                 trinary += '2';
    //             }
    //         }
    //     }
    //     let chunkSize = trinary.length / BOARDSPLITTING;
    //     let intState = [];
    //     for (let i = 0; i < BOARDSPLITTING; i++) {
    //         intState.push(parseInt(trinary.slice(i*chunkSize, (i+1)*chunkSize), 3));
    //     }
    //     return intState;
    // }
    
    // intStateToBoard(intState) {
    //     let trinary = '';
    //     for (let i = 0; i < BOARDSPLITTING; i++) {
    //         let trinaryChunk = intState[i].toString(3);
    //         trinaryChunk = '0'.repeat(ROWS*COLS/BOARDSPLITTING - trinaryChunk.length) + trinaryChunk;
    //         trinary += trinaryChunk;
    //     }
    //     const board = [];
    //     for (let i = 0; i < ROWS; i++) {
    //         const row = [];
    //         for (let j = 0; j < COLS; j++) {
    //             const char = trinary[i * COLS + j];
    //             if (char === '0') {
    //                 row.push(null);
    //             }
    //             else if (char === '1') {
    //                 row.push('player1');
    //             }
    //             else if (char === '2') {
    //                 row.push('player2');
    //             }
    //         }
    //         board.push(row);
    //     }
    //     return board;
    // }
}


export default Board;