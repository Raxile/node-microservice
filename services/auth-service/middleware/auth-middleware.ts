import { NextFunction, Request, Response } from "express"
import { postgresPrisma } from "../configs/prisma-db.config"
import ENV from "../configs/env";
import { verifyToken } from "../helpers/utils/jwt";


export const findSessionById = async (id: string) => await postgresPrisma.session.findUnique({ where: { id } })
const JWT_SECRET = ENV.ACCESS_TOKEN_SECRET || '1234';


const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error("Invalid or expired token")
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token, JWT_SECRET)
        const session = await findSessionById(decoded.id)

        if (!session || session.isRevoked) {
            throw new Error("Invalid or expired token")
        }
        (req as any).tokenData = decoded
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }

}


export default authMiddleware