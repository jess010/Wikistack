const express = require('express')
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const router = express.Router();

router.get('/', function(req, res, next){
  res.redirect('/wiki/');
})

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

module.exports = router;
