// TODO adapt the code to the rest of the project

import React, { useState, useEffect } from 'react';
import Board from '../utils/Board';
import io from 'socket.io-client';

//const socket = io('http://localhost:4000'); // Replace with your server URL

function Game(player1, player2) {
    const [board, setBoard] = useState(new Board());
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);


    useEffect(() => {
        async function waitForMove() {
            if (winner || draw) return;
            let moveSuccessfull = false;
            if(board.isFirstPlayerTurn){
                const col = player1.pickMove(board);
                moveSuccessfull = await board.playMove(col);
            } else {
                const col = player2.pickMove(board);
                moveSuccessfull = await board.playMove(col);
            }
            if (moveSuccessfull) {
                const newWinner = board.checkWinner();
                const newDraw = board.isDraw();
                setWinner(newWinner);
                setDraw(newDraw);
                setBoard(new Board(board.getBoard(), board.currentPlayer));
            }
        }
        waitForMove();
    }, [board, player1, player2, winner, draw]);

    function handleClick(col) {
        if (winner || draw) return;
        if (board.isFirstPlayerTurn) {
            player1.handleClick(col);
        } else {
            player2.handleClick(col);
        }
    };

    function renderCell(cell){
        if (cell === null) {
            return <div key={colIndex} className={`token`} onClick={() => handleClick(colIndex)} />;
        } else {
            return (
                <img
                    key={colIndex}
                    className={`token`}
                    onClick={() => handleClick(colIndex)}
                    src={"/images/chips/"+(cell === userRole ? userChipsStyle : opponent.chipsStyle)+"_"+cell+".png"}
                />
            );
        }
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
