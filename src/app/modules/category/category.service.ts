import { Category, Prisma } from '@prisma/client';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { categorySearchableFields } from './category.constant';
import { ICategoryFilterRequest } from './category.interface';

const createCategory = async (data: Category): Promise<Category> => {
  // const isExsistsCategory = await prisma.Category.findFirst({
  //   where: {
  //     id: data.CategoryId,
  //   },
  // });
  // if (!isExsistsCategory) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'Category does not exsist'
  //   );
  // }
  // data.semesterRegistrationId = isExsistsCategory.semesterRegistrationId;
  const result = await prisma.category.create({
    data,
    include: {
      books: true,
    },
  });
  return result;
};

const getAllCategorys = async (
  filters: ICategoryFilterRequest,
  pagination: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions: Prisma.CategoryWhereInput =
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

  const result = await prisma.category.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      books: true,
    },
  });

  const total = await prisma.category.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};
const updateSingleCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
    include: {
      books: true,
    },
  });
  return result;
};
const deleteSingleCategory = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategorys,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
