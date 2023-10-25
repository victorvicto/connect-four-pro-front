const express = require('express');
var passport = require('passport');
// global.mongoose = mongoose
const path = require('path');
const app = express();
const port = 3000;

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/users');

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');

// app.use(express.static(path.join(__dirname, 'public'))); // Not necessary yet

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.get('/*', (req, res) => {
  res.render('errors/404.ejs');
})

app.use((err, req, res, next) => {
  res.render('errors/500.ejs', { errormessage: err });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})