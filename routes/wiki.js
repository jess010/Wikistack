const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  //console.log(req.body);
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    //status: req.body.status
    //urlTitle: createUrlTitle(req.body.title)
  })
  page.save();
   //User build
  //email: req.body.email,
  //name: req.body.name,

  res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});


module.exports = router;

/*function createUrlTitle(title){
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}*/
