import express from 'express';
import asyncHandler from '../../helpers/utils/async-handler';
import { getUserDetailHandler, getUserSessionsHandler, sessionRevokeHandler } from './user-handler';
import authMiddleware from '../../middleware/auth-middleware';

const userRouter = express.Router();

userRouter.get(
    '/',
    authMiddleware,
    asyncHandler(getUserDetailHandler)
);


userRouter.get(
    '/sessions',
    asyncHandler(getUserSessionsHandler)
);

userRouter.post(
    '/sessions/:sessionId/revoke',
    asyncHandler(sessionRevokeHandler)
);


export default userRouter;
