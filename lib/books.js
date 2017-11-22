const knex = require('./knex')

function find(id) {
  const query = knex('books').select(
    'id',
    'title',
    'author',
    'genre',
    'description',
    'cover_url as coverUrl',
    'created_at as createdAt',
    'updated_at as updatedAt'
  )
  if (id) {
    return query.where('id', req.params.id).first()
  } else {
    return query.orderBy('title', 'ASC')
  }
}

function validateId({id}) {
  if (!id || Number.isNaN(id)) {
    return Promise.reject(new Error('Invalid ID'))
  }
  return Promise.resolve(id)
}

function deleteById(id) {
  return knex('books')
    .del()
    .where('id', id)
}

function deleteAll() {
  return knex('books')
    .del()
}

module.exports = {find, deleteById, validateId,
  deleteAll}
