const express = require("express");
const router = express.Router()
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");


const userController = require("../controllers/user.js");

router
.route("/signup")
.get(userController.renderSignupUser)
.post(wrapAsync(userController.signupUser));


router
.route("/login")
.get (userController.loginUser)
.post(saveRedirectUrl,
    passport.authenticate("local", { 
    failureRedirect: "/login",
    failureFlash:true}),
    userController.login);
     

//LOGOUT

router.get("/logout",userController.logout);

// //SIGNUP

// router.get("/signup", (req,res) => {
//     res.render("users/signup.ejs");
// });

// router.post("/signup",
// wrapAsync())


// //LOGIN

// router
// .get("/login", (req,res) => {
//     res.render("users/login.ejs");
// })
// .post("/login",
//     saveRedirectUrl,
//     passport.authenticate("local", { 
//     failureRedirect: "/login",
//     failureFlash:true }),
//      async(req,res) => {
//   req.flash("success","Welcome back to Wanderlust!");
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// });


module.exports = router;