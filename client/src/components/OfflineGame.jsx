import React, { useState } from 'react';
import { checkWinner, ROWS, COLS } from '../utils/game';

const createBoard = () => {
    const board = [];
    for (let i = 0; i < ROWS; i++) {
        board.push(Array(COLS).fill(null));
    }
    return board;
};

const OfflineGame = ({ opponent }) => {
    const userRole = opponent.role === 'p1' ? 'p2' : 'p1';
    const [board, setBoard] = useState(createBoard());
    const [currentPlayer, setCurrentPlayer] = useState('p1');
    const [winner, setWinner] = useState(null);

    React.useEffect(() => {
        if (currentPlayer === opponent.role && !winner) {
            console.log(opponent);
            const move = opponent.pickMove(board);
            console.log(move);
            move.then(col => playMove(col));
        }
    }, [board, currentPlayer, winner]);

    const handleClick = (col) => {
        if (winner) return;

        if (currentPlayer === userRole){
            playMove(col);
        } else if (opponent.handleClick) {
            opponent.handleClick(col);
        }
    };

    function playMove(col) {
        const newBoard = board.map(row => row.slice());
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!newBoard[row][col]) {
                newBoard[row][col] = currentPlayer;
                break;
            }
        }
        setBoard(newBoard);
        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
        } else {
            setCurrentPlayer(currentPlayer === 'p1' ? 'p2' : 'p1');
        }
    }

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