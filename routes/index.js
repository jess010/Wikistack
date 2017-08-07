const express = require('express')
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const router = express.Router();

router.get('/', function(req, res, next){
  res.send('we got the homepage to work');
})

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

module.exports = router;
