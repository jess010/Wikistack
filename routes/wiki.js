const express = require('express')
const router = express.Router();
const models = require('../models')
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    //status: req.body.status
    // urlTitle not built yet
  })
  page.save();

  //email: req.body.email,
  //name: req.body.name,

  res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});


module.exports = router;
