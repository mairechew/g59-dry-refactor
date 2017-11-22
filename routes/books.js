const knex = require('../lib/knex')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  getAll()
  .then(data => res.send(data))
  .catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res, next) => {
  return Promise.resolve(checkInput(req.params))
  .then(getOne)
  .then((data) => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
})

router.post('/', (req, res, next) => {
  // Make sure that the information that you want is in the request body.
    addOne(req.body)
    .then(([bookId]) => {
      res.send({bookId})
    })
    .catch(err => {
      next(err)
    })
})

function checkInput({id}) {
  if (!id || Number.isNaN(id)) {
    throw new Error('Invalid ID')
  }
  return id
}

function getAll(){
  return knex('books')
  .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
  .orderBy('title', 'ASC')
}

function getOne(id) {
  return knex('books')
    .where('id', id)
    .first()
}

function addOne(book) {
  return knex('books')
    .insert({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      cover_url: book.coverUrl,
    }, '*')
}

function update(book) {
  return knex('books')
    .update({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      cover_url: book.coverUrl,
    }, '*')
    .where('id', book.id)
}

function deleteBook(id) {
  return knex('books')
      .del()
      .where('id', id)
}

function formatBook(books){
  const newObj = {
    id: books[0].id,
    title: books[0].title,
    author: books[0].author,
    genre: books[0].genre,
    description: books[0].description,
    coverUrl: books[0].cover_url,
  }
  return newObj
}

router.put('/:id', (req, res, next) => {
  return Promise
  .resolve(checkInput(req.params))
  .then(getOne)
  .then(book => {
    if (!book || book.length === 0) {
      return res.status(404).send({message: 'Not found'})
    }
    return req.body
  })
  .then(update)
  .then(books => {
    formatBook(books)
    res.send(newObj)
  })
  .catch(err => {
    next(err)
  })
})

router.delete('/:id', (req, res, next) => {
  let book = null
  let id = checkInput(req.params)
    deleteBook(req.params.id)
    .catch(err => res.status(500).send(err))
    .then(data => {
      res.status(200).send({deleted: data})
    })
})

module.exports = router
