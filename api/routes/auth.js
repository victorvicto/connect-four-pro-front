const express = require('express');
const passport = require('passport');
const User = require('./models/users');

var router = express.Router();

router.post('/login',
    passport.authenticate('local'),
    (req, res, next) => {
        res.json({message: "authentication complete"}); // TODO generate and include jwt here
});

router.post('/register',
    (req, res, next) => {
        User.register(new User({username: req.body.username}), req.body.password, (err) => {
            if (!err) {
                return next();
            }
            console.log(err);
            res.status(300).json({message: "Registering aborted"});
        })
    },
    passport.authenticate('local'),
    (req, res, next) => {
        res.json({message: "Successfully registered"});
    }
);

module.exports = router;