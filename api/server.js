const express = require('express');
var session = require('express-session');
const cors = require('cors');
require('dotenv').config();
var passport = require('passport');

const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_KEY, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/users');

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,  // a secret string used to sign the session ID cookie
    resave: false,  // don't save session if unmodified
    saveUninitialized: false  // don't create session until something stored
  }))

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