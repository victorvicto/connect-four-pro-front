const { Server } = require('socket.io');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('../models/users'); // Adjust the path as necessary

function initializeSocket(server) {
    const matchmakingPool = []; // TODO: make a database collection for this
    const games = {};

    function matchFound(p1, p1SocketId, p2, p2SocketId) {
        const p1Id = p1._id.toString();
        const p2Id = p2._id.toString();
        const gameId = `${Date.now()}-${p1Id}-${p2Id}`;
        const p1Starts = Math.random() < 0.5;
        games[gameId] = {"turn": p1Starts ? p1Id : p2Id, "players": {}};
        games[gameId]["players"][p1Id] = p1SocketId;
        games[gameId]["players"][p2Id] = p2SocketId;
        io.to(p1SocketId).emit('gameFound', { gameId, opponent: p2, starts: p1Starts });
        io.to(p2SocketId).emit('gameFound', { gameId, opponent: p1, starts: !p1Starts });
    }

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

        socket.on('findGame', async () => {
            if (socket.request.user) {
                const user = socket.request.user;
                const playerInfo = await User.findById(user._id);
                
                if (!playerInfo) {
                    console.error('User not found');
                    return;
                }
                let bestMatch = null;
                let bestMatchIndex = -1;
                let minEloDifference = Infinity;

                // Find the best match in the pool
                matchmakingPool.forEach((player, index) => {
                    const eloDifference = Math.abs(playerInfo.elo - player.playerInfo.elo);
                    if (eloDifference < minEloDifference) {
                        bestMatch = player;
                        bestMatchIndex = index;
                        minEloDifference = eloDifference;
                    }
                });

                if (bestMatch) {
                    // Remove the matched player from the pool
                    matchmakingPool.splice(bestMatchIndex, 1);

                    // Create a new game
                    matchFound(playerInfo, socket.id, bestMatch.playerInfo, bestMatch.socketId);
                } else {
                    // Add the player to the pool
                    matchmakingPool.push({ socketId: socket.id, playerInfo: playerInfo });
                }
            } else {
                console.log('User not authenticated');
            }
        });

        socket.on('makeMove', ({ gameId, col }) => {
            if (games[gameId]) {
                if (socket.request.user) {
                    const user = socket.request.user;
                    const userId = user._id.toString();
                    const playerSocket = games[gameId]["players"][userId];
                    if (playerSocket === socket.id && userId === games[gameId].turn) {
                        // Emit the move to the other player
                        const opponentId = Object.keys(games[gameId]["players"]).find(id => id !== userId);
                        io.to(games[gameId]["players"][opponentId]).emit('moveMade', col);
                        // Switch turns
                        games[gameId].turn = opponentId;
                    }
                }
            }
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