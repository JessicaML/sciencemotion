const express = require('express'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      logger = require('morgan'),
      session = require('express-session'),
      displayRoutes = require('express-routemap'),
      pg = require('pg').native;

var db = require('./models');

var app = express();


const adminRouter = require('./routes/admin'),
      authenticationRouter = require('./routes/authentication'),
      lessonRouter = require('./routes/lessons'),
      changePasswordRouter = require('./routes/change-password');

app.set('view engine', 'pug');

app.use(express.static('public'));


app.use(logger('dev'));

app.use(session({
  name: 'session-cookie',
  secret: 'our secret key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));



function myFunction() {
    setInterval(function sessionCleanup() {
    sessionStore.all(function(err, sessions) {
        for (var i = 0; i < sessions.length; i++) {
            sessionStore.get(sessions[i], function() {} );
        }
    });
}, 3000);
}


app.use(bodyParser.urlencoded({ extended: false}));



// for deleting posts
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/admin', adminRouter);
app.use('/', authenticationRouter);
app.use('/', lessonRouter);
app.use('/', changePasswordRouter);

// comment posted to db
app.post('/posts/:id/comments', (req, res) => {
  db.Post.findById(req.params.id).then((post) => {
    console.log(post.UserId);
    var comment = req.body;
    comment.PostId = post.id;

    db.Comment.create(comment).then(() => {
      res.redirect('/' + post.slug);
        });
  });
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

//gets homepage list of posts
app.get('/', (req, res) => {
  console.log(req.session);
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((blogPosts) => {
    res.render('index', { blogPosts: blogPosts, user: req.session.user });
  });
});


//get individual post page
app.get('/:slug', (req, res) => {
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

var port = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('Web server started at port 8000!');
  });
});
