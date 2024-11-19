const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    elo: {
        type: Number,
        default: 600
    },
    games: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
    chipsStyle: {
        type: String,
        default: "default"
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);