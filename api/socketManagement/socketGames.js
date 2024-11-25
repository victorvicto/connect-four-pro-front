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

        socket.on('findGame', (playerInfo) => {
            const { playerId, elo } = playerInfo;
            let bestMatch = null;
            let bestMatchIndex = -1;
            let minEloDifference = Infinity;
    
            // Find the best match in the pool
            for (let i = 0; i < matchmakingPool.length; i++) {
                const opponent = matchmakingPool[i];
                const eloDifference = Math.abs(opponent.elo - elo);
                if (eloDifference < minEloDifference) {
                    minEloDifference = eloDifference;
                    bestMatch = opponent;
                    bestMatchIndex = i;
                }
            }
    
            if (bestMatch) {
                // Remove the matched player from the pool
                matchmakingPool.splice(bestMatchIndex, 1);
    
                // Create a new game
                const gameId = `game-${Date.now()}`;
                socket.join(gameId);
                io.to(bestMatch.socketId).emit('gameFound', { gameId, opponent: playerInfo });
                socket.emit('gameFound', { gameId, opponent: bestMatch });
            } else {
                // Add the player to the pool
                matchmakingPool.push({ socketId: socket.id, playerId, elo });
            }
        });

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
            // Remove the player from the pool if they disconnect
            const index = matchmakingPool.findIndex(player => player.socketId === socket.id);
            if (index !== -1) {
                matchmakingPool.splice(index, 1);
            }
        });
    });

    return io;
}

module.exports = initializeSocket;