class Board {
    constructor(board = null, currentPlayer = 'p1', rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
        if (board === null){
            this.board = this.createBoard();
        } else {
            this.board = board;
        }
        this.currentPlayer = currentPlayer;
    }

    createBoard() {
        const board = [];
        for (let i = 0; i < this.rows; i++) {
            board.push(Array(this.cols).fill(null));
        }
        return board;
    }

    getBoard() {
        return this.board;
    }

    playMove(col) {
        if(col < 0 || col >= this.cols) return false;
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.board[row][col]) {
                this.board[row][col] = this.currentPlayer;
                this.currentPlayer = this.currentPlayer === 'p1' ? 'p2' : 'p1';
                return true;
            }
        }
        return false;
    }

    checkWinner() {
        const checkDirection = (row, col, rowDir, colDir) => {
            const player = this.board[row][col];
            if (!player) return null;
            for (let i = 1; i < 4; i++) {
                const newRow = row + rowDir * i;
                const newCol = col + colDir * i;
                if (
                    newRow < 0 || newRow >= this.rows ||
                    newCol < 0 || newCol >= this.cols ||
                    this.board[newRow][newCol] !== player
                ) {
                    return false;
                }
            }
            return true;
        };

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.board[row][col]) {
                    if (
                        checkDirection(row, col, 0, 1) || // Horizontal
                        checkDirection(row, col, 1, 0) || // Vertical
                        checkDirection(row, col, 1, 1) || // Diagonal down-right
                        checkDirection(row, col, 1, -1)   // Diagonal down-left
                    ) {
                        return this.board[row][col];
                    }
                }
            }
        }
        return null;
    }

    isDraw() {
        return this.board[0].every(cell => cell !== null);
    }

    resetBoard() {
        this.board = this.createBoard();
        this.currentPlayer = 'p1';
    }

    getValidMoves() {
        const validMoves = [];
        for (let col = 0; col < this.cols; col++) {
            if (this.board[0][col] === null) {
                validMoves.push(col);
            }
        }
        return validMoves;
    }

    isWinningMove(col, player) {
        const tempBoard = this.board.map(row => row.slice());
        for (let row = tempBoard.length - 1; row >= 0; row--) {
            if (tempBoard[row][col] === null) {
                tempBoard[row][col] = player;
                break;
            }
        }
        return this.checkWinner(tempBoard) === player;
    }
    
    // boardToString() {
    //     return this.board.map(row => row.map(cell => {
    //         if (cell === null) return '.';
    //         if (cell === 'p1') return '1';
    //         if (cell === 'p2') return '2';
    //     }).join('')).join('\n');
    // }
    
    // stringToBoard(boardString) {
    //     const rows = boardString.split('\n');
    //     this.board = rows.map(row => row.split('').map(cell => {
    //         if (cell === '.') return null;
    //         if (cell === '1') return 'p1';
    //         if (cell === '2') return 'p2';
    //     }));
    // }

    boardToIntState() {
        let trinary = '';
        for (let row of board) {
            for (let cell of row) {
                if (cell === null) {
                    trinary += '0';
                } else if (cell === 'player1') {
                    trinary += '1';
                } else if (cell === 'player2') {
                    trinary += '2';
                }
            }
        }
        let chunkSize = trinary.length / BOARDSPLITTING;
        let intState = [];
        for (let i = 0; i < BOARDSPLITTING; i++) {
            intState.push(parseInt(trinary.slice(i*chunkSize, (i+1)*chunkSize), 3));
        }
        return intState;
    }
    
    intStateToBoard(intState) {
        let trinary = '';
        for (let i = 0; i < BOARDSPLITTING; i++) {
            let trinaryChunk = intState[i].toString(3);
            trinaryChunk = '0'.repeat(ROWS*COLS/BOARDSPLITTING - trinaryChunk.length) + trinaryChunk;
            trinary += trinaryChunk;
        }
        const board = [];
        for (let i = 0; i < ROWS; i++) {
            const row = [];
            for (let j = 0; j < COLS; j++) {
                const char = trinary[i * COLS + j];
                if (char === '0') {
                    row.push(null);
                }
                else if (char === '1') {
                    row.push('player1');
                }
                else if (char === '2') {
                    row.push('player2');
                }
            }
            board.push(row);
        }
        return board;
    }
}


export default Board;