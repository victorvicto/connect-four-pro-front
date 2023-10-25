const express = require('express');
const passport = require('passport');

var router = express.Router();

router.get('/login', (req, res, next) => {
    res.render('login.ejs');
});

router.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        res.redirect('/user/' + req.user.username);
});

module.exports = router;