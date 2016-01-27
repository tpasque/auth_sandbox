var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var bcrypt = require('bcrypt')


function Users(){
  return knex('users');
}
// set a cookie when they come to the site
// we need to use bcrypt here to encrypt the password and then insert into the database.
// this is signing up, we use a different bcrypt function when the user is signing in
// need to define a salt by putting 8 in the var crypted hashSync.  Can do other numbers as well.
// we need to use bcrypt to compare the values that have now been encrypted.  Need to do this in the /login route

router.post('/', function(req, res, next) {
  var crypted = bcrypt.hashSync(req.body.password, 8)
  Users().insert({email: req.body.email, password: crypted}).then(function(val){
    //protect cookies with several ways
    // can put {secure: true}
    // can also put "httponly" as well as "signed" where "secure" is in the object below.
    res.cookie("user", req.body.email, {secure:true});
    res.redirect("/tickets");
  });
});

//set a cookie when we login
// use bcrypt here to make sure we verify the right password is right.  When we login we are only looking for the
// email match.  we use the .where and .first to do this then after that put if bcrypt.compareSync
// this function can compare a string (password from user) and an encryption
router.post('/login', function(req, res, next) {
    Users().where({email: req.body.email, password: req.body.password}).first().then(function(found){
       if (found){
         if (bcrypt.compareSync(req.body.passord, found.password)){
           // put in secure portion in the res.cookie
           res.cookie("user", req.body.email, {secure:true});
           res.redirect("/tickets");
         }

       } else {
         res.redirect("/no_auth");
       }
    })
});

router.get('/', function(req, res, next) {
  Users.select().then(function(users){
    res.render("users/index", {users: users});
  });
});

module.exports = router;
