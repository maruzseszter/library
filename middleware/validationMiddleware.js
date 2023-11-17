import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { BOOK_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Book from '../models/BookModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith('no book')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateBookInput = withValidationErrors([
  body('title').notEmpty().withMessage('cím megadása kötelező'),
  body('author').notEmpty().withMessage('szerző megadása kötelező'),
  body('ISBN').notEmpty().withMessage('ISBN megadása kötelező'),
  body('publisher').notEmpty().withMessage('kiadó megadása kötelező'),
  body('year').notEmpty().withMessage('év megadása kötelező'),
  body('bookType').notEmpty().withMessage('kategória megadása kötelező'),
  body('quantity').notEmpty().withMessage('darabszám megadása kötelező'),
  
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    const book = await Book.findById(value);
    if (!book) throw new NotFoundError(`no book with id ${value}`);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === book.createdBy.toString();

    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('not authorized to access this route');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('studentID')
    .notEmpty()
    .withMessage('StudentID is required'),
  body('lastname').notEmpty().withMessage('Lastname is required'),
  body('firstname').notEmpty().withMessage('Firstname is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
 // body('studentID').notEmpty().withMessage('studentID is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('firstname').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('email already exists');
      }
    }),

  //body('location').notEmpty().withMessage('location is required'),
  
]);