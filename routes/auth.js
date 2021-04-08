const express = require("express");
const router = express.Router();
const passport = require("passport");

// /api/auth

router.post("/", passport.authenticate('local', { failureRedirect: '/signin' }),
  function(req, res) {
    res.send("Sucess")
  });


module.exports = router

