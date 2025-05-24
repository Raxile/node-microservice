import express from 'express';
import validateRequest from '../../middleware/validation-request';
import { registerSchema } from './user-validation-schema';
import asyncHandler from '../../helpers/utils/async-handler';
import { registerUserHandler } from './user-handler';

const userRouter = express.Router();

userRouter.post(
  '/register',
  validateRequest.body(registerSchema),
  asyncHandler(registerUserHandler)
);

export default userRouter;
