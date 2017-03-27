router.get('/my-posts', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((userPosts) => {
    console.log("userposts length is....");
    console.log(userPosts.length);
    console.log(userPosts);

    var thisUserPosts = [];

    var findUserPosts = function(listOfObjects) {
    for (i = 0; i < userPosts.length; i++) {
        console.log(userPosts.length);
        console.log("is this bloody working?");

        console.log(userPosts);
        var thisUserPosts = [];
        if (userPosts.UserId === req.session.user.id) {
          console.log(userPosts[i].id);
          thisUserPosts.push(userPosts[i]);
        }
        console.log(thisUserPosts[0]);
        console.log(thisUserPosts[0].text);

        return thisUserPosts;
    }
    };
  }).then((userPosts) => {
    res.render('posts/my-posts', {userPosts: userPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});


var UserId = 1;

var Posts = [
    post1 = {
      id : 1,
      text: "bla bla"
    }, post2 = {
      id : 2,
      text: "ya ya"
    },
  ];

var findUserPosts = function(listOfObjects) {
  var thisUserPosts = [];
for (i = 0; i < Posts.length + 1; i++) {
    console.log(Posts.length);
    var thisUserPosts = [];
    if (Posts[i].id === UserId) {
      console.log(Posts[i].id);
      thisUserPosts.push(Posts[i]);
    }
    console.log(thisUserPosts[0]);
    console.log(thisUserPosts[0].text);

    return thisUserPosts;
}
};


findUserPosts(Posts);

// promise


var promise = new Promise(function (resolve, reject) {

  // do the thing
    // if there was an error
    reject(error);
    // if everything went well
    resolve(result); });

//gets userPosts

router.get('/my-posts', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((userPosts) => {
    res.render('posts/my-posts', { userPosts: userPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});


var p2 = new Promise(function(resolve, reject) {
  resolve(1);
});

p2.then(function(value) {
  console.log(value); // 1
  return value + 1;
}).then(function(value) {
  console.log(value + "- This synchronous usage is virtually pointless"); // 2- This synchronous usage is virtually pointless
});

p2.then(function(value) {
  console.log(value); // 1
});

//if statement to find only logged-in user posts

router.get('/my-posts', (req, res) => {
  db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((userPosts, thisUserPosts) => {
    console.log("userposts length is....");
    console.log(userPosts.length);
    for (i = 0; i < userPosts.length; i++) {
        if (userPosts.UserId === req.session.user.id) {
          thisUserPosts.push(userPosts[i]);
        }
        console.log(thisUserPosts);
        return thisUserPosts;
    }
    res.render('posts/my-posts', { userPosts: userPosts, thisUserPosts: thisUserPosts, user: req.session.user });
  }).catch((error) => {
    throw error;
  });
});



  router.get('/my-posts', (req, res) => {
    db.Post.findAll({ order: [['createdAt', 'DESC']] }).then((blogPosts) => {
      var userPosts = [];
      for each (blogPost in blogPosts) {

    if (blogPost.UserId === req.session.user.id) {
      thisUserPosts.push(userPosts[i]);
        return ifTruePromise();
    } else {
        // do something, no new promise
        // hope to stop the then chain
    }
  }
}).then(// I can handle the result of ifTruePromise here now);
