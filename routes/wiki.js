const express = require('express')
const router = express.Router();

router.get("/", function(req, res, next){
  res.send("We are at the wiki route!")
})


module.exports = router;
