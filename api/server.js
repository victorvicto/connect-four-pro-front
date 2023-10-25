const express = require('express');
require('dotenv').config();
var passport = require('passport');

const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_KEY, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/users');

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');

// app.use(express.static(path.join(__dirname, 'public'))); // Not necessary yet

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.get('/*', (req, res) => {
    res.status(404).json({message: "Page not found"});
})

app.use((err, req, res, next) => {
    res.status(500).json({message: err});
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})