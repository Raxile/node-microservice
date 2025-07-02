import { Request, Response } from "express";
import { registerUserService } from "./auth-service";

export const registerUserHandler = async (req: Request, res: Response) => {
  const response = await registerUserService(req.body);
  res.setHeader('Cache-Control', 'no-store'); // ✅ Prevent caching
  res.status(response.statusCode).json(response);
};


export const loginUserHandler = () => { }