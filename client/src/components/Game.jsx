// TODO adapt the code to the rest of the project

import React, { useState, useEffect } from 'react';
import Board from '../utils/Board';
import io from 'socket.io-client';

//const socket = io('http://localhost:4000'); // Replace with your server URL

function Game({player1, player2}) {
    const [board, setBoard] = useState(new Board());
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);
    const currentPlayerName = board.isFirstPlayerTurn ? player1.name : player2.name;

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

    function renderCell(rowIndex, colIndex, cellContent) {
        if (board.isCellEmpty(rowIndex, colIndex)) {
            return <div key={colIndex} className={`token`} onClick={() => handleClick(colIndex)} />;
        } else {
            return (
                <img
                    key={colIndex}
                    className={`token`}
                    onClick={() => handleClick(colIndex)}
                    src={"/images/chips/"+(board.isCellFirstPlayer(rowIndex, colIndex) ? player1.chipsStyle : player2.chipsStyle)+"_"+cellContent+".png"}
                />
            );
        }
    };

    return (
        <>
            <h2>It's {currentPlayerName}'s turn!</h2>
            <div className="game-board">
                {boardState.getBoard().map((row, rowIndex) => (
                    <div key={rowIndex} className="game-row">
                        {row.map((cellContent, colIndex) => {
                            renderCell(rowIndex, colIndex, cellContent);
                        })}
                    </div>
                ))}
                {winner && <div className="error-pannel">Winner: {winner}</div>}
                {draw && <div className="error-pannel">It's a draw!</div>}
            </div>
        </>
    );
};

export default Game;
