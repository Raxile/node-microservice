import { getUserDetailService, getUserSessionsService, sessionRevokeService } from './user-service';
import { Request, Response } from 'express';


export const getUserDetailHandler = async (req: Request, res: Response) => {
  const response = await getUserDetailService((req as any)?.tokenData?.userId)
  res.status(response.statusCode).json(response);
}

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const response = await getUserSessionsService((req as any)?.tokenData?.userId)
  res.status(response.statusCode).json(response);
}

export const sessionRevokeHandler = async (req: Request, res: Response) => {
  const { sessionId } = req.params;

  const response = await sessionRevokeService(sessionId)
  res.status(response.statusCode).json(response);
}