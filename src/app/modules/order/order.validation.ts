import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

const OrderStatusEnumValues = Object.values(OrderStatus).filter(
  value => typeof value === 'string'
);

const OrderedBookSchema = z.object({
  bookId: z.string({ required_error: 'BookId is Required' }),
  quantity: z.number({ required_error: 'Quantity is Required' }),
});

const OrderedBooksSchema = z.array(OrderedBookSchema, {
  required_error: 'Ordered Books is Required',
});

const createOrderZodSchema = z.object({
  body: z.object({
    orderedBooks: OrderedBooksSchema,
    status: z
      .enum([...OrderStatusEnumValues] as [string, ...string[]])
      .optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
