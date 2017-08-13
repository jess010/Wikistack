const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;


router.get('/', function(req, res, next) {
  Page.findAll()
  .then(pages => {
    res.render('index', {pages: pages})
  })
  //res.redirect('/')
});


router.get('/add', function(req, res, next) {
  res.render('addpage')
});

function findByUrlTitle (url) {
  return Page.findOne({
    where: {
      urlTitle: url
    }
  })
}

function getAuthorFromPage (page) {
  return User.findOne({
    where: {id: page.authorId}
  })
}


router.get('/:urlTitle', function(req, res, next) {
  //res.send('hit dynamic route at ' + req.params.urlTitle)
  var pagePromise = findByUrlTitle(req.params.urlTitle)
  var userPromise = pagePromise.then(page => {return getAuthorFromPage(page)})
  Promise.all([pagePromise, userPromise])
  .then(values => {
    var page = values[0]
    var user = values[1]
    res.render('wikipage', {
      page: page,
      user: user
    })
  })
  .catch(next)
});

// function buildPageFromForm (title, content, tags) {
//   var page = Page.build({
//     title: title,
//     content: content,
//     tags: tags
//     //authorId: authorId
//   })
//   return page;
// }

function createUserFromForm (name, email) {
  var user = User.findOrCreate({
    where: {name: name, email: email}
  })
  return user;
}

router.post('/', function(req, res, next) {
  //res.json(req.body)
  createUserFromForm(req.body.name, req.body.email)
  .then(function (values) {
    //console.log(values)
    var user = values[0]
    //var page = buildPageFromForm(req.body.title, req.body.content, req.body.tags)
    var page = Page.build(req.body)
    return page.save().then(function (savedPage) {return savedPage.setAuthor(user)})
  })
  .then(function (page) {
    res.redirect(page.route)
  })
  .catch(next);
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
