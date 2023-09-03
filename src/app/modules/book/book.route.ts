import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateSingleBook
);
router.delete('/:id', BookController.deleteSingleBook);
router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBooks);
router.post(
  '/',
  validateRequest(BookValidation.createBookZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

export const BookRoute = router;
