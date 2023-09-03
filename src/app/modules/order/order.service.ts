import { Order, OrderStatus, Prisma } from '@prisma/client';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import { JwtPayload } from 'jsonwebtoken';
import { orderSearchableFields } from './order.constant';
import { IOrderFilterRequest } from './order.interface';

type CreateOrderData = {
  id: string;
  userId: string;
  orderedBooks: { bookId: string; quantity: number }[];
  status: OrderStatus;
};

const createOrder = async (data: CreateOrderData): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      id: data.id,
      userId: data.userId,
      orderedBooks: data.orderedBooks,
      status: data.status,
    },
  });
  return result;
};

const getAllOrders = async (
  filters: IOrderFilterRequest,
  pagination: IPaginationOptions,
  decodedToken: JwtPayload
): Promise<IGenericResponse<Order[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Add conditions for minPrice and maxPrice

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: orderSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: string } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await prisma.order.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
  });
  const total = await prisma.order.count();

  const specificCustomerOrAdmin = result.filter(
    user => user.userId === decodedToken.userId || decodedToken.role === 'admin'
  );

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: specificCustomerOrAdmin,
  };
};

const getSingleOrder = async (id: string, decodedToken: JwtPayload) => {
  // console.log('decodedToken.UserId', decodedToken);
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  console.log(result?.userId);
  console.log('decodedToken.role', decodedToken.userId);
  //user.userId === decodedToken.userId || decodedToken.role === 'admin'
  if (
    (result && result.userId === decodedToken.userId) ||
    decodedToken.role === 'admin'
  ) {
    return result;
  }
};

// const updateSingleOrder = async (
//   id: string,
//   data: Partial<Order>
// ): Promise<Order> => {
//   const result = await prisma.order.update({
//     where: {
//       id,
//     },
//     data,
//     include: {
//       user: true,
//     },
//   });
//   return result;
// };
// const deleteSingleOrder = async (id: string): Promise<Order> => {
//   const result = await prisma.Order.delete({
//     where: {
//       id,
//     },
//   });
//   return result;
// };

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  // getCategoryOrder,
  // updateSingleOrder,
  // deleteSingleOrder,
};
