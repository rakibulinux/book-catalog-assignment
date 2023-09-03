import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { paginationFields } from '../../../constants/pagination';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilterableFields } from './order.constant';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const accessToken: string | undefined = req.headers.authorization;
  if (accessToken) {
    const decodedToken = jwtHelpers.verifyToken(
      accessToken,
      config.jwt.secret as Secret
    );
    const body = req.body;
    body.userId = decodedToken.userId;
    console.log(body);
    const result = await OrderService.createOrder(body);
    console.log(result);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Order Created successfully!`,
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Access token is missing.',
      data: null,
    });
  }
});
// Update the type definition for getAllOrders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const pagination = pick(req.query, paginationFields);
  const accessToken: string | undefined = req.headers.authorization;
  if (accessToken) {
    const decodedToken = jwtHelpers.verifyToken(
      accessToken,
      config.jwt.secret as Secret
    );
    const result = await OrderService.getAllOrders(
      filters,
      pagination,
      decodedToken
    );

    // Check if the result is null and set the appropriate message
    const message = result
      ? 'Order Retrieve successfully!'
      : 'UNAUTHORIZED ACCESS';

    sendResponse(res, {
      statusCode: result ? httpStatus.OK : httpStatus.UNAUTHORIZED, // Set the status code based on the result
      success: result !== null,
      message: message,
      data: result,
    });
  }
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getSingleOrder(req.params.id);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${
      result
        ? 'Get A Single Order Successfully!'
        : `No Order Find For This ID: ${req.params.id}`
    }`,
    data: result,
  });
});
// const getCategoryOrder = catchAsync(async (req: Request, res: Response) => {
//   const result = await OrderService.getCategoryOrder(req.params.id);

//   sendResponse<Order[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: `${
//       result
//         ? 'Get All Orders By Category Successfully Retrive!'
//         : `No Order Find For This ID: ${req.params.id}`
//     }`,
//     data: result,
//   });
// });
// const updateSingleOrder = catchAsync(async (req: Request, res: Response) => {
//   const result = await OrderService.updateSingleOrder(req.params.id, req.body);
//   sendResponse<Order>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Update A Single Order Successfully!',
//     data: result,
//   });
// });
// const deleteSingleOrder = catchAsync(async (req: Request, res: Response) => {
//   const result = await OrderService.deleteSingleOrder(req.params.id);

//   sendResponse<Order>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Delete A Single Order Successfully!',
//     data: result,
//   });
// });

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  // getCategoryOrder,
  // updateSingleOrder,
  // deleteSingleOrder,
};
