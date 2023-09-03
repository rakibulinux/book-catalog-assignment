import express from 'express';
import { AuthRouters } from '../modules/auth/auth.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/users',
    route: UserRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
