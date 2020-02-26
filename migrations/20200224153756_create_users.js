
exports.up = function(knex) {
  return knex.schema.createTable('Users', tbl => {
      tbl.increments()
      tbl.string('username', 256)
      .notNullable()
      .index()
      .unsigned()

      tbl.string('Password', 256)
      .notNullable()


  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExist('Users')
};
