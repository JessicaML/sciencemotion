'use strict';

var express = require('express'),
    db = require('../models'),
    router = express.Router();

//to see admin panel, users must be logged in

var requireUser = (req, res, next) => {
  if (req.path === '/') {
    return next();
  }

  if (req.session.user) {
    next();
  } else {
    res.redirect('/admin');
  }
};

router.use(requireUser);

//redirect unlogged-in users to log in pages

router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/posts');
  }

  res.render('login');
});


//gets home page of logged-in admin panel
router.get('/eye', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((blogPosts) => {
    res.render('lessons/eye', { blogPosts: blogPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});

router.get('/eye', (req, res) => {
  db.Post.findOne({
    where: {
      slug: req.params.slug
    }
  }).then((post) => {
    return post.getComments().then((comments) => {
      res.render('posts/show', { post: post, comments: comments });
    });
  }).catch((error) => {
    res.status(404).end();
  });
});

module.exports = router;
