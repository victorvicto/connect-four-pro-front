const express = require('express');
const passport = require('passport');

var router = express.Router();

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    (req, res, next) => {
        res.json({message: "authentication complete"}) // TODO generate and include token here
});

module.exports = router;