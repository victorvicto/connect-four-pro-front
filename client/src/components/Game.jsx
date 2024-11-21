import React, { useState, useEffect } from 'react';
import Board from '../utils/Board';

function Game({player1, player2}) {
    const [board, setBoard] = useState(new Board());
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);
    const currentPlayerName = board.isFirstPlayerTurn ? player1.name : player2.name;
    const topMessage = winner ? `${winner} wins!` : draw ? "It's a draw!" : `It's ${currentPlayerName}'s turn!`;

    useEffect(() => {
        async function waitForMove() {
            if (winner || draw) return;
            let moveSuccessfull = false;
            if(board.isFirstPlayerTurn){
                const col = await player1.pickMove(board);
                moveSuccessfull = board.playMove(col);
            } else {
                const col = await player2.pickMove(board);
                moveSuccessfull = board.playMove(col);
            }
            if (moveSuccessfull) {
                const newWinner = board.checkWinner();
                const newDraw = board.isDraw();
                setWinner(newWinner);
                setDraw(newDraw);
                setBoard(new Board(board.getBoard(), board.isFirstPlayerTurn));
            } else {
                waitForMove();
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
            <div className='game-view'>
                <h2>{topMessage}</h2>
                <div className="game-board">
                    {/* {board.getBoard().map((row, rowIndex) => (
                        <div key={rowIndex} className="game-row">
                            {row.map((cellContent, colIndex) => (
                                renderCell(rowIndex, colIndex, cellContent)
                            ))}
                        </div>
                    ))} */}
                </div>
            </div>
        </>
    );
};

export default Game;
