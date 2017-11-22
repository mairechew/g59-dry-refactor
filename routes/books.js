const knex = require('../lib/knex')
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  knex('books')
  .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
  .orderBy('title', 'ASC')
  .then(data => res.send(data))
  .catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res, next) => {
  // make sure that id is a number,
  // if it is not a number, send a 400 (Bad Request)
  if (!req.params.id || Number.isNaN(req.params.id)) {
    throw new Error('Invalid ID')
  }

  knex('books')
  .select('id', 'title', 'author', 'genre', 'description', 'cover_url as coverUrl', 'created_at as createdAt', 'updated_at as updatedAt')
  .where('id', req.params.id)
  .first()
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
})

router.post('/', (req, res, next) => {
  // Make sure that the information that you want is in the request body.
  knex('books')
    .insert({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl,
    }, '*')
    .then(([bookId]) => {
      res.send({bookId})
    })
    .catch(err => {
      next(err)
    })
})

router.put('/:id', (req, res, next) => {
  // Make sure that id is a number
  if (!req.params.id || Number.isNaN(req.params.id)) {
    throw new Error('Invalid ID')
  }

  knex('books')
    .where('id', req.params.id)
    .first()
    .then(book => {
      if (!book) {
        return next()
      }

      return knex('books')
        .update({
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          description: req.body.description,
          cover_url: req.body.coverUrl,
        }, '*')
        .where('id', req.params.id)
    })
    .then(books => {
      if (!books) { return {message: 'nothing found for given id'} }
      const newObj = {
        id: books[0].id,
        title: books[0].title,
        author: books[0].author,
        genre: books[0].genre,
        description: books[0].description,
        coverUrl: books[0].cover_url,
      }
      res.send(newObj)
    })
    .catch(err => {
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  let book = null

  if (!req.params.id || Number.isNaN(req.params.id)) {
    throw new Error('Invalid ID')
  }

  knex('books')
    .del()
    .where('id', req.params.id)
    .catch(err => res.status(500).send(err))
})

module.exports = router
