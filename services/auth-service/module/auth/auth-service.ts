import ENV from "../../configs/env";
import customResponse from "../../helpers/common/common-response";
import { CUSTOM_ERROR_CODES, ERROR_CODES, STATUS_CODES } from "../../helpers/constants/status-codes";
import { TLoginPayload, TUserPayload } from "../../helpers/types/common.types";
import { decodeJWT, signToken } from "../../helpers/utils/jwt";
import { createSession, findUserByEmail, revokeSession, saveUser, updateSessionRefreshHash } from "./auth-queries";
import bcrypt from 'bcrypt';

export const registerUserService = async (data: TUserPayload) => {
  const existUser = await findUserByEmail(data.email);
  if (existUser)
    return customResponse(
      CUSTOM_ERROR_CODES.CONFLICT,
      ERROR_CODES.CONFLICT,
      'User already exists'
    );
  data.password = bcrypt.hashSync(data.password, 10);
  const user = await saveUser(data);
  const userId = user?.id
  if (!user?.id) {
    return customResponse(
      CUSTOM_ERROR_CODES.CONFLICT,
      ERROR_CODES.CONFLICT,
      'User creation failed'
    );
  }
  const session = await createSession({ userId })
  const token = signToken({ id: session.id, userId }, ENV.REFRESH_TOKEN_SECRET || "1234", { expiresIn: Number(ENV.REFRESH_TOKEN_TIME) })
  const accessToken = signToken({ id: session.id, userId }, ENV.ACCESS_TOKEN_SECRET || "1234", { expiresIn: Number(ENV.ACCESS_TOKEN_TIME) })
  const decode = decodeJWT(token)
  const expiresAt = decode?.exp ? new Date(decode.exp * 1000) : new Date()
  updateSessionRefreshHash(session.id, { expiresAt, refreshTokenHash: bcrypt.hashSync(token, 10) })
  return customResponse(
    STATUS_CODES.CREATED,
    STATUS_CODES.CREATED,
    'user created successfully',
    { refreshToken: token, accessToken }
  );
};




export const loginUserService = async (data: TLoginPayload) => {

  const existUser = await findUserByEmail(data.email)

  if (!existUser)
    return customResponse(
      CUSTOM_ERROR_CODES.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED,
      'Invalid email or password'
    );

  const isPasswordValid = await bcrypt.compare(data.password, existUser.password);

  if (!isPasswordValid) {
    return customResponse(
      CUSTOM_ERROR_CODES.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED,
      'Invalid email or password'
    )
  };

  const session = await createSession({ userId: existUser?.id })
  const token = signToken({ id: session.id, userId: existUser?.id }, ENV.REFRESH_TOKEN_SECRET || "1234", { expiresIn: Number(ENV.REFRESH_TOKEN_TIME) })
  const accessToken = signToken({ id: session.id, userId: existUser?.id }, ENV.ACCESS_TOKEN_SECRET || "1234", { expiresIn: Number(ENV.ACCESS_TOKEN_TIME) })
  const decode = decodeJWT(token)
  const expiresAt = decode?.exp ? new Date(decode.exp * 1000) : new Date()
  updateSessionRefreshHash(session.id, { expiresAt, refreshTokenHash: bcrypt.hashSync(token, 10) })

  return customResponse(
    STATUS_CODES.OK,
    STATUS_CODES.OK,
    'Login successful',
    { refreshToken: token, accessToken }
  );
}

export const logoutUserService = async ({ id }: { id: string }) => {
  const session = await revokeSession(id)
  if (!session || !session.isRevoked)
    return customResponse(
      CUSTOM_ERROR_CODES.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED,
      'Invalid email or password'
    );

  return customResponse(
    STATUS_CODES.OK,
    STATUS_CODES.OK,
    'Logout Successfully'
  )
}