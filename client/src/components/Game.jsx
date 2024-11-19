// TODO adapt the code to the rest of the project

import React, { useState, useEffect } from 'react';
import Board from '../utils/Board';
import io from 'socket.io-client';

//const socket = io('http://localhost:4000'); // Replace with your server URL

const Game = () => {
    const [board, setBoard] = useState(new Board());
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);


    // useEffect(() => {
    //     // Listen for board updates from the server
    //     socket.on('boardUpdate', (newBoard) => {
    //         setBoard(newBoard.board);
    //         setCurrentPlayer(newBoard.currentPlayer);
    //         setWinner(newBoard.winner);
    //     });

    //     // Clean up the socket connection on component unmount
    //     return () => {
    //         socket.off('boardUpdate');
    //     };
    // }, []);

    const handleClick = (col) => {
        if (winner) return;

        // Emit the move to the server
        socket.emit('makeMove', { col, player: currentPlayer });
    };

    const renderCell = (row, col) => {
        return (
            <div className="cell" onClick={() => handleClick(col)} key={col}>
                {board.getBoard()[row][col]}
            </div>
        );
    };

    return (
        <div>
            <h1>Connect 4</h1>
            {winner && <h2>Winner: {winner}</h2>}
            <div className="board">
                {board.getBoard().map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, colIndex) => renderCell(rowIndex, colIndex))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Game;
