const ROWS = 6;
const COLS = 7;

function boardToTrinaryString(board) {
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
    return trinary;
}

function trinaryStringToBoard(str) {
    const board = [];
    for (let i = 0; i < ROWS; i++) {
        const row = [];
        for (let j = 0; j < COLS; j++) {
            const char = str[i * COLS + j];
            if (char === '0') {
                row.push(null);
            } else if (char === '1') {
                row.push('player1');
            } else if (char === '2') {
                row.push('player2');
            }
        }
        board.push(row);
    }
    return board;
}


function getValidMoves(board) {
    const validMoves = [];
    for (let col = 0; col < board[0].length; col++) {
        if (board[0][col] === null) {
            validMoves.push(col);
        }
    }
    return validMoves;
}

function isWinningMove(board, col, player) {
    const tempBoard = board.map(row => row.slice());
    for (let row = tempBoard.length - 1; row >= 0; row--) {
        if (tempBoard[row][col] === null) {
            tempBoard[row][col] = player;
            break;
        }
    }
    return checkWinner(tempBoard) === player;
}

function checkWinner(board){
    const checkDirection = (row, col, rowDir, colDir) => {
        const player = board[row][col];
        if (!player) return null;

        for (let i = 1; i < 4; i++) {
            const newRow = row + rowDir * i;
            const newCol = col + colDir * i;
            if (
                newRow < 0 || newRow >= ROWS ||
                newCol < 0 || newCol >= COLS ||
                board[newRow][newCol] !== player
            ) {
                return false;
            }
        }
        return true;
    };

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                if (
                    checkDirection(row, col, 0, 1) || // Horizontal
                    checkDirection(row, col, 1, 0) || // Vertical
                    checkDirection(row, col, 1, 1) || // Diagonal down-right
                    checkDirection(row, col, 1, -1)   // Diagonal down-left
                ) {
                    return board[row][col];
                }
            }
        }
    }
    return null;
};

function isDraw(board) {
    return board[0].every(cell => cell !== null);
}

export { COLS, ROWS, boardToTrinaryString, trinaryStringToBoard, checkWinner, getValidMoves, isWinningMove, isDraw };