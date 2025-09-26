import { Router } from 'express';
import userRouter from '../module/user/user-routes';
import authRouter from '../module/auth/auth-routes';
import logRouter from "../module/logs/logs-routes"

const mainRoutes = Router();

mainRoutes.use('/user', userRouter);
mainRoutes.use('/auth', authRouter);
mainRoutes.use("/logs", logRouter)

export default mainRoutes;
