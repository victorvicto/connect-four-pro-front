// FILE: api/socketManager.js
const { Server } = require('socket.io');

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
            methods: ['GET', 'POST'],
            credentials: true
        } 
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('joinGame', (gameId) => {
            socket.join(gameId);
            console.log(`User ${socket.id} joined game ${gameId}`);
        });

        socket.on('makeMove', ({ gameId, col }) => {
            console.log(`Move made in game ${gameId} by ${socket.id}: column ${col}`);
            io.to(gameId).emit('moveMade', col);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
}

module.exports = initializeSocket;