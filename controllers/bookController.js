import Book from '../models/BookModel.js';
import { StatusCodes } from 'http-status-codes';
//import { NotFoundError } from '../errors/customErrors.js';
export const getAllBooks = async (req, res) => {
  const books = await Book.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ books });
};

export const createBook = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const book = await Book.create(req.body);
  res.status(StatusCodes.CREATED).json({ book });
};

export const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.status(StatusCodes.OK).json({ book });
};

export const updateBook = async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'book modified', book: updatedBook });
};

export const deleteBook = async (req, res) => {
  const removedBook = await Book.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'book deleted', book: removedBook });
};

