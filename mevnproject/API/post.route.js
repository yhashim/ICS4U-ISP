
const express = require('express');
const postRoutes = express.Router();

// Require post model in our routes module
let Post = require('./post.model');

// Defined store route
postRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let post = new Post(req.body);
  console.log(post);
  post.save()
    .then(() => {
      res.status(200).json({'business': 'business is added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
postRoutes.route('/').get(function (req, res) {
  console.log(req);
    Post.find(function(err, posts){
    if(err){
      res.json(err);
    }
    else {
      res.json(posts);
    }
  });
});

// Defined edit route
postRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Post.findById(id, function (err, post){
      if(err) {
        res.json(err);
      }
      res.json(post);
  });
});

//  Defined update route
postRoutes.route('/update/:id').post(function (req, res) {
    Post.findById(req.params.id, function(err, post) {
    if (!post)
      res.status(404).send("data is not found");
    else {
        post.type = req.body.type;
        post.a = req.body.a;
        post.b = req.body.b;
        post.c = req.body.c;
        post.m = req.body.m;
        post.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
postRoutes.route('/delete/:id').delete(function (req, res) {
    console.log(req.body);
    console.log(req.params);

    Post.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err){
          //console.log(err);
         res.json(err);
        }else {
          Post.find(function(err, posts){
            if(err){
              res.json(err);
            }
            else {
              res.json(posts);
            }
          });
        }
    });
});

module.exports = postRoutes;
