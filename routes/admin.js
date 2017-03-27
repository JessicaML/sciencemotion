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
router.get('/posts', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((blogPosts) => {
    res.render('posts/index', { blogPosts: blogPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});

router.get('/my-posts', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((userPosts) => {

    var thisUserPosts = [];
    userPosts.forEach(function(elem, index, array) {
      if (elem.UserId === req.session.user.id) {
        thisUserPosts.push(elem);
        }
      }
    );
    return thisUserPosts;
  }).then((thisUserPosts) => {
    res.render('posts/my-posts', {thisUserPosts: thisUserPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});




//gets new page
router.get('/posts/new', (req, res) => {
  res.render('posts/new', { user: req.session.user });
});

//posts new blogpost to db
router.post('/posts', (req, res) => {
  db.Post.create(req.body).then((post) => {
    res.redirect('/' + post.slug);
    }).catch((error) => {
      res.render('posts/new', { errors: error.errors, user: req.session.user });

  });
});

//gets edit post page
router.get('/posts/:id/edit', (req, res) => {
  db.Post.findOne({
    where: {
      id: req.params.id
    }
  }).then((post) => {
    res.render('posts/edit', { post: post, user: req.session.user });
  });
});

//edits post data
router.put('/posts/:id/edit', (req, res) => {
  db.Post.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/admin/posts');
  }).catch((post, error, id) => {
    res.render('posts/edit', { post: req.params, user: req.session.user, error: { message: 'Check your input' }, id: req.params.id });
  });
});

//deletes post
router.delete('/posts/:id', (req, res) => {
  db.Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.redirect('/admin/posts');
  });
});

module.exports = router;
