import prisma from '../../../shared/prisma';

import { JwtPayload } from 'jsonwebtoken';

const getSingleProfile = async (decodedToken: JwtPayload) => {
  const result = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  });
  console.log(decodedToken);
  if (result && result.id === decodedToken.userId) {
    return result;
  }
};

export const ProfileService = {
  getSingleProfile,
};
