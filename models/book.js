const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  isbn: String,
  publishedDate: Date
});

module.exports = mongoose.model('Book', bookSchema);
