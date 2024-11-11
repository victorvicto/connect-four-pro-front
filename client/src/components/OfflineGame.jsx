import React, { useState } from 'react';
import { checkWinner, isDraw, ROWS, COLS } from '../utils/game';

const createBoard = () => {
    const board = [];
    for (let i = 0; i < ROWS; i++) {
        board.push(Array(COLS).fill(null));
    }
    return board;
};

const OfflineGame = ({ opponent }) => {
    const userRole = opponent.opponentRole;
    const [board, setBoard] = useState(createBoard());
    const [currentPlayer, setCurrentPlayer] = useState('p1');
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);

    React.useEffect(() => {
        const makeMove = async () => {
            if (currentPlayer === opponent.role && !winner) {
                console.log('Waiting for opponent to make a move...');
                const move = await opponent.pickMove(board);
                console.log('Opponent move:', move);
                playMove(move);
            }
        };
        makeMove();
    }, [board, currentPlayer, opponent, winner]);

    const handleClick = (col) => {
        if (winner) return;

        if (currentPlayer === userRole){
            playMove(col);
        } else if (opponent.handleClick) {
            console.log(col);
            opponent.handleClick(col);
        }
    };

    // TODO: move this function in a more sensible file and make sure to use the player object code instead of the hardcoded values p1 and p2
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
        } else if (isDraw(newBoard)) {
            setDraw(true);
        } else {
            setCurrentPlayer(currentPlayer === 'p1' ? 'p2' : 'p1');
        }
    }

    return (
        <div className='game-board'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='game-row'>
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            onClick={() => handleClick(colIndex)}
                            className='token'
                            style={{
                                backgroundColor: cell === 'p1' ? 'red' : cell === 'p2' ? 'yellow' : '#2021',
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
                        setCurrentPlayer('p1');
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
            {draw && (
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
                    <h2 style={{ color: 'white' }}>Draw!</h2>
                    <button onClick={() => {
                        setBoard(createBoard());
                        setCurrentPlayer('p1');
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
    );
};

export default OfflineGame;