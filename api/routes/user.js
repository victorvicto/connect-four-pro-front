var express = require('express');

var router = express.Router();

router.use(checkConnection);

router.get('/', (req, res, next) => {
    res.json({userInfo: req.session.user});
});

function checkConnection(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.status(414).json({message: "User not authenticated"});
}

module.exports = router;