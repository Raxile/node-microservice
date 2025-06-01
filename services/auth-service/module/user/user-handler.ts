import { registerUserService } from './user-service';
import { Request, Response } from 'express';

export const registerUserHandler = async (req: Request, res: Response) => {
  const response = await registerUserService(req.body);
  res.status(response.statusCode).json(response);
};
