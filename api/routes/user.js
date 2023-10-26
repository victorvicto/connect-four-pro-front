var express = require('express');

var router = express.Router();

router.use(checkConnection);

router.get('/', (req, res, next) => {
    res.json({userInfo: req.session.user});
});

function checkConnection(req, res, next){
    console.log("checking connection for /user");
    if(req.isAuthenticated()){
        console.log("auth success");
        return next();
    }
    console.log("auth fail");
    res.status(414).json({message: "User not authenticated"});
}

module.exports = router;