const express = require('express');
const passport = require('passport');

var router = express.Router();

var toy_user_database = {}

function toy_authenticate(req, res, next){

}

router.post('/login',
    passport.authenticate('local'),
    (req, res, next) => {
        res.json({message: "authentication complete"}) // TODO generate and include jwt here
});

module.exports = router;