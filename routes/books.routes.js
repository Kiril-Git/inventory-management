const express = require('express')
const BookModel = require('../models/book.model')
const {createBookValidation, handleValidationErrors, updateBookValidation, idValidation} = require("../validators/book.validator.js");

const router = express.Router()

router.post('/', createBookValidation, handleValidationErrors, async (req, res) => {

  try {
    const newBook = await BookModel.create(req.body)
    res.status(201).json(newBook)

  }
  catch(err) {
    res.status(400).json({message: err.message})
  }

})

router.get('/',   async (req, res) => {
  try {
    console.log('Database:', BookModel.db.name)
    console.log('Collection:', BookModel.collection.name)

    const bookList = await BookModel.find()
    res.status(200).send(bookList)
  }
  catch(err) {
    res.status(400).json({message: err.message})
  }
})

router.get('/:bookId', idValidation, handleValidationErrors, async (req, res) => {
  try {
    const { bookId } = req.params

    const book = await BookModel.findById(bookId)

    if (!book) {
      return res.status(404).json({message: req.t('bookNotFound')})
    }

    res.status(200).send(book)
  }
  catch(err) {
    res.status(400).json({message: err.message})
  }
})

router.delete('/:bookId', idValidation, handleValidationErrors, async (req, res) => {
  try {
    const { bookId } = req.params
    const deletedBook = await BookModel.findByIdAndDelete(bookId)

    if (!deletedBook) {
      return res.status(404).json({message: req.t('bookNotFound')})
    }

    res.status(200).json({message: `${bookId} ${req.t('deletedSuccessfully')}`})
  }
  catch(err) {
    res.status(400).json({message: err.message})
  }
})

router.put('/:bookId',idValidation, updateBookValidation, handleValidationErrors, async (req, res) => {

  try {

    const { bookId } = req.params
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true })

    if (!updatedBook) {
      return res.status(404).json({message: req.t('bookNotFound')})
    }

    res.status(200).json({message: `${bookId} ${req.t('updatedSuccessfully')}`, updatedBook})
  }
  catch(err) {
    res.status(400).json({message: err.message})
  }
})

module.exports = router

