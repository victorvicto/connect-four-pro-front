var express = require('express');

var router = express.Router();

router.get('/', checkConnection, (req, res, next) => {
  res.json({userInfo: req.session.user});
});

function checkConnection(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.status(403).json({"message":"User not authenticated", "redirect": "/login"});
}

module.exports = router;