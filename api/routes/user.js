var express = require('express');

var router = express.Router();

const User = require('../models/users');

async function updateChipsStyle(new_style, user){
    try {
        const updatedUser = await User.findOneAndUpdate( {username: user.username}, {chipsStyle: new_style}, {new: true} );
        console.log(updatedUser);
        return true;
    } catch (error) {
        console.error('Failed to update user:', error);
        return false;
    }
}

router.use(checkConnection);

router.get('/', (req, res, next) => {
    res.json({userInfo: req.user});
});

router.post('/update', async (req, res, next) => {
    let success = false;
    if (req.body.toBeUpdated === 'chipsStyle') {
        success = updateChipsStyle(req.body.chipsStyle, req.user);
    }
    if (success) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

function checkConnection(req, res, next){
    console.log("checking connection for /user");
    console.log(req.session);
    var wow = req.isAuthenticated();
    console.log(wow);
    if(wow){
        console.log("auth success");
        return next();
    }
    console.log("auth fail");
    res.status(300).json({message: "User not authenticated"});
}

module.exports = router;