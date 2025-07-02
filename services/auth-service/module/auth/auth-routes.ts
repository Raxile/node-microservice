import { Router } from "express";
import asyncHandler from "../../helpers/utils/async-handler";
import { registerUserHandler } from "./auth-handler";


const authRouter = Router()

authRouter.post("/register", asyncHandler(registerUserHandler))

// authRouter.post("/login")

// authRouter.post("/logout")

// authRouter.post("/refresh")


export default authRouter
