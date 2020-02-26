const db = require('../data/dbconfig.js')
module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findBy
}

function find(){
    return db('Users')
}

function findById(id) {
    return db('Users')
    .where({id})
    .first()
}

function add(user) {
    return db('Users')
    .insert(user, 'id')
}

function update(changes, id) {
    return db('Users')
    .where({id})
    .update(changes)
}

function remove(id) {
    return db("Users")
    .where({id})
    .del()
}

function findBy(filter) {
    return db('users')
      .select('id', 'username', 'password')
      .where(filter);
  }