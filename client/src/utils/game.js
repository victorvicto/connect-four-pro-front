const ROWS = 6;
const COLS = 7;

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
    // Implement logic to check if placing a piece in the column `col` results in a win for `player`
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

export { COLS, ROWS, checkWinner, getValidMoves, isWinningMove, isDraw };