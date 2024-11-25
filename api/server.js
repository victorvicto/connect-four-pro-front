const express = require('express');
var bodyParser = require('body-parser')
var session = require('express-session');
const cors = require('cors');
require('dotenv').config();
var passport = require('passport');
const initializeSocket = require('./socketManager');
const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS_KEY, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;

var corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.ATLAS_KEY })
});

app.use(sessionMiddleware);

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

const io = initializeSocket(server);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})