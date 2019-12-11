const db = require('../data/db-config.js');

module.exports = {
  allUsers,
  findByID,
  postUser,
  findUserPosts
}

function allUsers () {
  return db('users');
}

function findByID(id) {
  return db('users').where({ id }).first();
}

function postUser(user) {
  return db('users').insert(user, 'id').then(ids => {
    const [ id ] = ids;

    return findByID(id);
  })
}

function findUserPosts(userId) {
  return db('posts as p', 'p.contents as Quote', 'u.username as Author')
  .join('users as u', 'p.user_id', 'u.id')
  .where('user_id', userId);
}