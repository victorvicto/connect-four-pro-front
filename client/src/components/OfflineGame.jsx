import React, { useState, useEffect } from 'react';
import Board from '../utils/Board';

const OfflineGame = ({ opponent, userChipsStyle }) => {
    const userRole = opponent.opponentRole;
    const [boardState, setBoardState] = useState(new Board());
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);

    useEffect(() => {
        const makeMove = async () => {
            if (boardState.currentPlayer === opponent.role && !winner && !draw) {
                console.log('Waiting for opponent to make a move...');
                const move = await opponent.pickMove(boardState);
                console.log('Opponent move:', move);
                playMove(move);
            }
        };
        makeMove();
    }, [boardState, opponent, winner, draw]);

    const playMove = (col) => {
        if (boardState.playMove(col)) {
            const newWinner = boardState.checkWinner();
            const newDraw = boardState.isDraw();
            setWinner(newWinner);
            setDraw(newDraw);
            setBoardState(new Board(boardState.getBoard(), boardState.currentPlayer));
        }
    };

    const handleClick = (col) => {
        if (!winner && !draw && boardState.currentPlayer === userRole) {
            playMove(col);
        }
    };

    return (
        <div className="game-board">
            {boardState.getBoard().map((row, rowIndex) => (
                <div key={rowIndex} className="game-row">
                    {row.map((cell, colIndex) => {
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
                    })}
                </div>
            ))}
            {winner && <div className="error-pannel">Winner: {winner}</div>}
            {draw && <div className="error-pannel">It's a draw!</div>}
        </div>
    );
};

export default OfflineGame;