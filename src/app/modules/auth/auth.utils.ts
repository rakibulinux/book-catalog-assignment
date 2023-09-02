import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserModel = {
  async isUserExist(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    return user || null;
  },

  async isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean> {
    return givenPassword === savedPassword;
  },
};
