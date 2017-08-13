const express = require('express')
const router = express.Router();
const models = require('../models');
const User = models.User;
const Page = models.Page;

router.get('/', function(req, res, next) {
  //res.redirect('/')
  User.findAll({})
  .then(function (users) {
    res.render('authorpage', {
        users: users
    })
  }).catch(next)
})

router.get('/:id', function(req, res, next) {
  var userPromise = User.findById(req.params.id)
  var pagePromise = Page.findAll({where: {authorId: req.params.id}})

  Promise.all([userPromise, pagePromise])
  .then(values => {
    const user = values[0]
    const pages = values[1]
    res.render('authorpage', {
        pages: pages,
        user: user
    })
  }).catch(next)
})

module.exports = router;
