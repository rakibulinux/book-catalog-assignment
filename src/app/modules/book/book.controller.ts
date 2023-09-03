import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { BookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);
  console.log(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Book Created successufully!
      `,
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await BookService.getAllBooks(filters, pagination);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Book Successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBook(req.params.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result
        ? 'Get A Single Book Successfully!'
        : `No Book Find For This ID: ${req.params.id}`
    }`,
    data: result,
  });
});
const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateSingleBook(req.params.id, req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update A Single Book Successfully!',
    data: result,
  });
});
const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteSingleBook(req.params.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete A Single Book Successfully!',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
