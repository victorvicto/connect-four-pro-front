const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: 'default-profile.png'
    },
    elo: {
        type: Number,
        default: 600
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);