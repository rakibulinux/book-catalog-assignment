import { Book, Prisma } from '@prisma/client';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './book.constant';
import { IBookFilterRequest } from './book.interface';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });
  return result;
};

const getAllBooks = async (
  filters: IBookFilterRequest,
  pagination: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
  console.log(filters);
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Add conditions for minPrice and maxPrice
  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parseFloat(minPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parseFloat(maxPrice),
      },
    });
  }
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
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

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      reviewAndRatings: true,
      category: true,
    },
  });

  const total = await prisma.book.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      reviewAndRatings: true,
      category: true,
    },
  });
  return result;
};
const getCategoryBook = async (id: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
    },
  });
  return result;
};
const updateSingleBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
    include: {
      reviewAndRatings: true,
      category: true,
    },
  });
  return result;
};
const deleteSingleBook = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  getCategoryBook,
  updateSingleBook,
  deleteSingleBook,
};
