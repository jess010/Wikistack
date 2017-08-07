const express = require('express')
const router = express.Router();

router.get("/", function(req, res, next){
  res.send("We are at the user route!")
})

module.exports = router;
