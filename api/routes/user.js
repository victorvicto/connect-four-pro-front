var express = require('express');

var router = express.Router();

router.use(checkConnection);

router.get('/', (req, res, next) => {
    res.json({userInfo: {username: req.session.passport.user}});
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