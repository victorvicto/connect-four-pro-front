import React, { useState } from 'react';

const ROWS = 6;
const COLS = 7;

const createBoard = () => {
    const board = [];
    for (let i = 0; i < ROWS; i++) {
        board.push(Array(COLS).fill(null));
    }
    return board;
};

const checkWinner = (board) => {
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

const getBotMove = (board) => {
    // Implement simple bot logic to choose a column
    // Return the column index
    const availableCols = [];
    for (let col = 0; col < COLS; col++) {
        if (board[0][col] === null) {
            availableCols.push(col);
        }
    }
    const randomIndex = Math.floor(Math.random() * availableCols.length);
    return availableCols[randomIndex];
};

const OfflineGame = ({ mode }) => {
    const [board, setBoard] = useState(createBoard());
    const [currentPlayer, setCurrentPlayer] = useState('Red');
    const [winner, setWinner] = useState(null);

    const handleClick = (col) => {
        if (winner) return;

        const newBoard = board.map(row => row.slice());
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!newBoard[row][col]) {
                newBoard[row][col] = currentPlayer;
                break;
            }
        }

        setBoard(newBoard);
        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
        } else {
            setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
            if (mode === 'bot' && currentPlayer === 'Red') {
                const botCol = getBotMove(newBoard);
                handleClick(botCol);
            }
        }
    };

    return (
        <div>
            <div style={{ position: 'relative' }}>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                onClick={() => handleClick(colIndex)}
                                style={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: cell || 'white',
                                    border: '1px solid black',
                                }}
                            />
                        ))}
                    </div>
                ))}
                {winner && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                        <h2 style={{ color: 'white' }}>{winner} wins!</h2>
                        <button onClick={() => {
                            setBoard(createBoard());
                            setCurrentPlayer('Red');
                            setWinner(null);
                        }} style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}>
                            Restart Game
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfflineGame;