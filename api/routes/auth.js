const express = require('express');
const passport = require('passport');

var router = express.Router();

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        res.redirect('/user/' + req.user.username);
});

module.exports = router;