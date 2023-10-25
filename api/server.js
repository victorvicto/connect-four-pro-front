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

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var dashboardRouter = require('./routes/dashboard');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', dashboardRouter);

app.get('/*', (req, res) => {
  res.render('errors/404.ejs');
})

app.use((err, req, res, next) => {
  res.render('errors/500.ejs', { errormessage: err });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})