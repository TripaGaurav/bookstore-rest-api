const Book = require("../models/Book")

// Get all books with optional filtering
 export async function getBooks(req, res) {
  try {
    const { genre, availability, page, limit } = req.query;

    const query = {};

    if (genre) {
      query.genre = genre;
    }

    if (availability === 'in-stock') {
      query.stock = { $gt: 0 };
    }

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };

    const books = await paginate(query, options);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
}

// Get a specific book by ID
export async function getBookById(req, res) {
  try {
    const book = await findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
}

// Create a new book (Admin Only)
export async function createBook(req, res) {
  try {
    const { title, author, genre, price, stock } = req.body;

    const newBook = new Book({ title, author, genre, price, stock });
    await newBook.save();

    res.json({ message: 'Book created successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create book' });
  }
}

// Update an existing book (Admin Only)
export async function updateBook(req, res) {
  try {
    const { title, author, genre, price, stock } = req.body;

    const book = await findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.price = price;
    book.stock = stock;

    await book.save();

    res.json({ message: 'Book updated successfully', book });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update book' });
  }
}

// Delete a book (Admin Only)
export async function deleteBook(req, res) {
  try {
    const book = await findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.remove();

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
}

// module.exports = {getBooks,getBookById,createBook,updateBook,deleteBook}
