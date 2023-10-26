const express = require('express');
const passport = require('passport');
const User = require('../models/users');

var router = express.Router();

router.post('/login',
    passport.authenticate('local'),
    (req, res, next) => {
        console.log("accessing login");
        res.json({message: "authentication complete"}); // TODO generate and include jwt here
});

router.post('/register',
    (req, res, next) => {
        console.log("accessing register");
        User.register(new User({username: req.body.username}), req.body.password, (err) => {
            console.log("inside user.register callback");
            if (!err) {
                console.log("no error inside user.register callback");
                return next();
            }
            console.log("error inside user.register callback:");
            console.log(err);
            res.status(300).json({message: "Registering aborted"});
        })
    },
    passport.authenticate('local'),
    (req, res, next) => {
        console.log("finished register");
        res.json({message: "Successfully registered"});
    }
);

module.exports = router;