import jwt, { SignOptions } from "jsonwebtoken"
/**
 * Signs a payload and returns a JWT token.
 * @param {Object} payload - The data you want to encode.
 * @param {String} [expiresIn=JWT_EXPIRES_IN] - Optional expiry override.
 * @returns {String} - Signed JWT token.
 */
export interface TJwtPayload {
    id: string;
    userId: string
    [key: string]: any;
}

export const signToken = (payload: TJwtPayload, secret: string, options: SignOptions) => {
    return jwt.sign(payload, secret, options);
};

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {String} token - The JWT token to verify.
 * @returns {Object} - Decoded payload.
 * @throws {Error} - If the token is invalid or expired.
 */
export const verifyToken = (token: string, secret: jwt.Secret): TJwtPayload => {
    const decoded = jwt.verify(token, secret);
    // Ensure decoded is an object (JwtPayload), not a string
    if (typeof decoded === 'string' || !decoded) {
        throw new Error('Invalid token payload');
    }
    return decoded as TJwtPayload;
};


export interface DecodedTokenPayload {
    exp?: number; // Expiry time (in seconds since epoch)
    iat?: number; // Issued at
    userId?: string;
    [key: string]: any; // Add more if needed
}

export const decodeJWT = (token: string): DecodedTokenPayload | null => {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || typeof decoded !== 'object') return null;

        return decoded as DecodedTokenPayload;
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
    }
};