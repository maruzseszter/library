import { Router } from 'express';
const router = Router();

import {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';
import { validateBookInput, validateIdParam } from '../middleware/validationMiddleware.js';

router.route('/').get(getAllBooks).post(validateBookInput, createBook);
router
  .route('/:id')
  .get(validateIdParam, getBook)
  .patch(validateBookInput, validateIdParam, updateBook)
  .delete(validateIdParam, deleteBook);

export default router;