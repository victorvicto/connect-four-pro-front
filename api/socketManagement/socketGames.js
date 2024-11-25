const { Server } = require('socket.io');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/users'); // Adjust the path as necessary

function initializeSocket(server) {
    const matchmakingPool = []; // TODO: make a database collection for this

    const io = new Server(server, {
        cors: {
            origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    const sessionMiddleware = session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.ATLAS_KEY })
    });

    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    });

    io.use((socket, next) => {
        passport.initialize()(socket.request, {}, next);
    });

    io.use((socket, next) => {
        passport.session()(socket.request, {}, next);
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('findGame', () => {
            if (socket.request.user) {
                const user = socket.request.user;
                User.findById(user._id, (err, playerInfo) => {
                    if (err) {
                        console.error('Error retrieving user info:', err);
                        return;
                    }
                    if (!playerInfo) {
                        console.error('User not found');
                        return;
                    }
                    const elo = playerInfo.elo;
                    const playerId = playerInfo._id;
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
            } else {
                console.log('User not authenticated');
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