import prisma from '../../../shared/prisma';

import { JwtPayload } from 'jsonwebtoken';

const getSingleProfile = async (id: string, decodedToken: JwtPayload) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (
    (result && result.id === decodedToken.userId) ||
    decodedToken.role === 'admin'
  ) {
    return result;
  }
};

export const ProfileService = {
  getSingleProfile,
};
