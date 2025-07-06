import { Request, Response } from "express";
import { loginUserService, logoutUserService, refreshTokenService, registerUserService } from "./auth-service";

export const registerUserHandler = async (req: Request, res: Response) => {
  const response = await registerUserService(req.body);
  res.setHeader('Cache-Control', 'no-store'); // ✅ Prevent caching
  res.status(response.statusCode).json(response);
};


export const loginUserHandler = async (req: Request, res: Response) => {
  const response = await loginUserService(req.body);
  res.status(response.statusCode).json(response)
}

export const logoutUserHandler = async (req: Request, res: Response) => {
  const response = await logoutUserService((req as any)?.tokenData);
  res.status(response.statusCode).json(response)
}

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const response = await refreshTokenService(req.body)
  res.status(response.statusCode).json(response)
}