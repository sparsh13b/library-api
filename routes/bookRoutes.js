const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// for CREATE requests
router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const savedBooks = await Book.insertMany(req.body);
      res.status(201).json(savedBooks);
    } else {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// for READ all requests
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// READ one
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Not found" });
  res.json(book);
});

// for UPDATE requests
router.put('/:id', async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// for DELETE requests
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
