exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('books', function(table) {
    table.increments()
    table.string('title', 64)
    table.string('author', 64)
    table.string('genre', 64)
    table.string('description', 256)
    table.string('cover_url', 256)
    // table.date('created_at')
    // table.date('updated_at')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books')
}
