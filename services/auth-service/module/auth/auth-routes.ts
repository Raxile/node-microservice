import { Router } from "express";
import asyncHandler from "../../helpers/utils/async-handler";
import { loginUserHandler, logoutUserHandler, registerUserHandler } from "./auth-handler";
import authMiddleware from "../../middleware/auth-middleware";


const authRouter = Router()

authRouter.post("/register", asyncHandler(registerUserHandler))

authRouter.post("/login", asyncHandler(loginUserHandler))

authRouter.post("/logout", authMiddleware, asyncHandler(logoutUserHandler))

// authRouter.post("/refresh")


export default authRouter
