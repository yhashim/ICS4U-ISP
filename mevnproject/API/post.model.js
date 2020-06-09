// post.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Post = new Schema({
  type: {
    type: String
  },
  a: {
    type: Number
  }, 
  b: {
    type: Number
  }, 
  c: {
    type: Number
  }, 
  m: {
    type: Number
  },
  xint: {
    type: String
  },
  yint: {
    type: String
  }
},{
    collection: 'posts'
});

module.exports = mongoose.model('Post', Post);
