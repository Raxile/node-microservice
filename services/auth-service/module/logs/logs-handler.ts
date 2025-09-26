import { Request, Response } from "express";
import { createLogService, getLogService } from "./logs-service";

export const createLogHandler = async (req: Request, res: Response) => {
    const response = await createLogService(req.body)
    res.status(response.statusCode).json(response)
}

export const getLogHandler = async (req: Request, res: Response) => {
    const response = await getLogService(req.query)
    res.status(response.statusCode).json(response)
}