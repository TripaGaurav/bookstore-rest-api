const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateUser, isAdmin } = require('../middleware/auth');

router.get('/books', authenticateUser, bookController.getBooks);
router.get('/books/:id', authenticateUser, bookController.getBookById);
router.post('/books', authenticateUser, isAdmin, bookController.createBook);
router.put('/books/:id', authenticateUser, isAdmin, bookController.updateBook);
router.delete('/books/:id', authenticateUser, isAdmin, bookController.deleteBook);

module.exports = router;
