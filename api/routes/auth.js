const express = require('express');
const passport = require('passport');
const User = require('../models/users');

var router = express.Router();
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({message: "Logout failed"});
        }
        res.json({message: "Successfully logged out"});
    });
});

router.post('/login',
    passport.authenticate('local'),
    (req, res, next) => {
        console.log("accessing login");
        console.log(req.session);
        res.json({message: "authentication complete"});
});

router.post('/register',
    (req, res, next) => {
        console.log("accessing register");
        try{
            console.log(req.body);
            User.register(new User({username: req.body.username, email: req.body.email}), req.body.password, (err) => {
                console.log("inside user.register callback");
                if (!err) {
                    console.log("no error inside user.register callback");
                    return next();
                }
                console.log("error inside user.register callback:");
                console.log(err);
                // TODO: give a custom message depending on error type (user already exists,...)
                res.status(300).json({message: "Unexpected error: Registering aborted"});
            });
        } catch(error){
            console.log("error happened while registering");
            console.log(error);
            res.status(300).json({message: "Registering aborted"});
        }
    },
    passport.authenticate('local'),
    (req, res, next) => {
        console.log("finished register");
        res.json({message: "Successfully registered"});
    }
);

module.exports = router;