class Board {
    constructor(rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.createBoard();
        this.currentPlayer = 'p1';
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
    
    boardToString() {
        return this.board.map(row => row.map(cell => {
            if (cell === null) return '.';
            if (cell === 'p1') return '1';
            if (cell === 'p2') return '2';
        }).join('')).join('\n');
    }
    
    stringToBoard(boardString) {
        const rows = boardString.split('\n');
        this.board = rows.map(row => row.split('').map(cell => {
            if (cell === '.') return null;
            if (cell === '1') return 'p1';
            if (cell === '2') return 'p2';
        }));
    }
}


export default Board;