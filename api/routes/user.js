var express = require('express');

var router = express.Router();

router.use(checkConnection);

router.get('/', (req, res, next) => {
  res.render('dashboard.ejs', {user: req.session.user});
});

function checkConnection(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/auth/login");
}

module.exports = router;