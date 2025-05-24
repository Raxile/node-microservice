import { Router } from 'express';
import userRouter from '../module/user/user-routes';

const mainRoutes = Router();

mainRoutes.use('/user', userRouter);

export default mainRoutes;
