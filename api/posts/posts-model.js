const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
};

// Calling find returns a promise that resolves to an array of all the posts contained in the database.
function find() {
  return db('posts');
}

// This method expects an id as it's only argument and returns a promise that resolves to the post 
//  corresponding to the id provided or undefined if no post with that id is found.
function findById(id) {
  return db('posts').where({ id: Number(id) }).first()
}

// Calling insert passing it a post object will add it to the database and return a promise that 
//  resolves to an object with the id of the inserted post. The object looks like this: { id: 123 }.
function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

// Accepts two arguments, the first is the id of the post to update and the second is an object 
//  with the changes to apply. It returns a promise that resolves to the count of updated records. 
//  If the count is 1 it means the record was updated correctly.
function update(id, post) {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}

// The remove method accepts an id as its first argument and upon successfully deleting the post 
//  from the database it returns a promise that resolves to the number of records deleted.
function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del();
}

// The findPostComments accepts a postId as its first argument and returns a promise that 
//  resolves to an array of all comments on the post associated with the post id.
function findPostComments(postId) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('post_id', postId);
}

function findCommentById(id) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('comments.id', id).first();
}

function insertComment(comment) {
  return db('comments')
    .insert(comment)
    .then(ids => ({ id: ids[0] }));
}
