import express from 'express';
import { StudentRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    route: StudentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
