import { Router } from 'express';
import userRouter from '../module/user/user-routes';
import authRouter from '../module/auth/auth-routes';

const mainRoutes = Router();

mainRoutes.use('/user', userRouter);
mainRoutes.use('/auth', authRouter);

export default mainRoutes;
