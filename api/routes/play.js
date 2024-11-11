const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { intStateToBoard, boardToIntState, checkWinner, getValidMoves, isDraw } = require('../utils/game');

const router = express.Router();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let games = {};

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('joinGame', (gameId) => {
        socket.join(gameId);
        if (!games[gameId]) {
            games[gameId] = {
                board: Array(6).fill(Array(7).fill(null)),
                currentPlayer: 'p1',
                players: [socket.id]
            };
        } else {
            games[gameId].players.push(socket.id);
        }
        io.to(gameId).emit('gameState', games[gameId]);
    });

    socket.on('makeMove', ({ gameId, col }) => {
        const game = games[gameId];
        if (!game) return;

        const board = game.board.map(row => row.slice());
        for (let row = 5; row >= 0; row--) {
            if (!board[row][col]) {
                board[row][col] = game.currentPlayer;
                break;
            }
        }

        const winner = checkWinner(board);
        if (winner) {
            io.to(gameId).emit('gameOver', { winner });
            delete games[gameId];
        } else if (isDraw(board)) {
            io.to(gameId).emit('gameOver', { winner: null });
            delete games[gameId];
        } else {
            game.board = board;
            game.currentPlayer = game.currentPlayer === 'p1' ? 'p2' : 'p1';
            io.to(gameId).emit('gameState', game);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        for (const gameId in games) {
            const game = games[gameId];
            game.players = game.players.filter(player => player !== socket.id);
            if (game.players.length === 0) {
                delete games[gameId];
            }
        }
    });
});

server.listen(3001, () => {
    console.log('Socket server running on port 3001');
});

module.exports = router;