import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constant';
import { IUserResponse } from './user.interface';
import { UserService } from './user.service';

// const createUser = catchAsync(async (req: Request, res: Response) => {
//   const result = await UserService.createUser(req.body);
//   sendResponse<User>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Users Created!',
//     data: result,
//   });
// });
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, pagination);
  sendResponse<Partial<IUserResponse[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Users Successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);
  sendResponse<Partial<IUserResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single User Successfully',

    data: result,
  });
});
const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const result = await UserService.updateSingleUser(id, body);
  sendResponse<Partial<IUserResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated Successfully!',
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteSingleUser(id);
  sendResponse<Partial<IUserResponse>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted Successfully!',
    data: result,
  });
});

export const UserController = {
  // createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
