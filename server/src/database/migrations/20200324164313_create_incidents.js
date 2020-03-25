
exports.up = function (knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments()
    
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.decimal('amount').notNullable()
    
    table.string('ngo_id').notNullable()

    table.foreign('ngo_id').references('id').inTable('ngos')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('incidents')
}
