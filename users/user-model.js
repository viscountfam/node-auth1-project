const db = require('../data/users.db3')
module.exports = {
    find,
    findById,
    add,
    update,
    remove
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