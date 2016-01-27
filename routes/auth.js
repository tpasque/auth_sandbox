var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

router.get('/', function(req, res, next) {
  if (req.cookies.user){
    res.redirect("/tickets");
  } else {
    res.render("auth/signin", {button_text: "sign in"});
  }
});

router.get('/signin', function(req, res, next) {
    if (req.cookies.user){
      res.render("auth/yougood");
    } else {
      res.render("auth/signin", {button_text: "sign in"});
    }
});

router.get('/signout', function(req, res, next) {
      res.clearCookie("user");
    res.render("auth/signin", {button_text: "sign in", notice: "you have been signed out"});
});

router.get('/signup', function(req, res, next) {
    res.render("auth/signup", {button_text: "sign up"});
});

router.get('/no_auth', function(req, res, next) {
    res.render("auth/yousuck");
});





module.exports = router;
