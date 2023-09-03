import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { categoryFilterableFields } from './category.constant';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);
  console.log(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Category Created successufully!`,
    data: result,
  });
});
const getAllCategorys = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, categoryFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await CategoryService.getAllCategorys(filters, pagination);

  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Category Successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getSingleCategory(req.params.id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result
        ? 'Get A Single Category Successfully!'
        : `No Category Find For This ID: ${req.params.id}`
    }`,
    data: result,
  });
});
const updateSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateSingleCategory(
    req.params.id,
    req.body
  );
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update A Single Category Successfully!',
    data: result,
  });
});
const deleteSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteSingleCategory(req.params.id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete A Single Category Successfully!',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategorys,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
