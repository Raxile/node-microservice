import { Router } from "express";
import asyncHandler from "../../helpers/utils/async-handler";
import { createLogHandler, getLogHandler } from "./logs-handler";
import validateRequest from "../../middleware/validation-request";
import logSchema from "./logs-validation-schema"

const logRouter = Router()


logRouter.get("/", asyncHandler(getLogHandler))

logRouter.post("/add", validateRequest.body(logSchema), asyncHandler(createLogHandler))

export default logRouter