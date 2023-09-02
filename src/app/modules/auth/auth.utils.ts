import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';

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
    try {
      return await bcrypt.compare(givenPassword, savedPassword);
    } catch (error) {
      // Handle bcrypt errors (e.g., invalid savedPasswordHash)
      return false; // You can choose how to handle errors
    }
    // return givenPassword === savedPassword;
  },
};

export const beforeUserSave = async (user: User): Promise<void> => {
  if (user.password) {
    const saltRounds = Number(config.bcrypt_salt_rounds);
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    //   return user;
  }
};

// export const beforeUserSave = async (user: User): Promise<User | undefined> => {
//   if (user.password) {
//     const saltRounds = Number(config.bcrypt_salt_rounds);
//     const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//     user.password = hashedPassword;
//     return user;
//   }
// };
