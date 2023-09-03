import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { ProfileService } from './profile.service';

const getSingleProfile = catchAsync(async (req: Request, res: Response) => {
  const accessToken: string | undefined = req.headers.authorization;
  if (accessToken) {
    const decodedToken = jwtHelpers.verifyToken(
      accessToken,
      config.jwt.secret as Secret
    );
    console.log(decodedToken);
    const result = await ProfileService.getSingleProfile(decodedToken);
    // console.log(result);
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `${
        result
          ? 'Get A Single Profile Successfully!'
          : `No Profile Find For This ID: ${req.params.id}`
      }`,
      data: result,
    });
  }
});

export const ProfileController = {
  getSingleProfile,
};
