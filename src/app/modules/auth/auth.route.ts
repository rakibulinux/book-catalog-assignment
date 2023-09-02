import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AuthUserController } from './auth.controller';
import { UserValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  AuthUserController.createAuthUser
);
router.post(
  '/signin',
  validateRequest(UserValidation.loginUserZodSchema),
  AuthUserController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenZodSchema),
  AuthUserController.refreshToken
);

export const AuthRouters = router;
