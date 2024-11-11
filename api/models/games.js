const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
    state: [int],
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    currentPlayer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);