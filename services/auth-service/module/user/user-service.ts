import customResponse from '../../helpers/common/common-response';
import { findUserByEmail, getUserById, getUsersSession, saveUser } from './user-queries';
import bcrypt from 'bcrypt';
import { TUserPayload } from './user-types';
import {
  ERROR_CODES,
  CUSTOM_ERROR_CODES,
  STATUS_CODES,
} from '../../helpers/constants/status-codes';
import { revokeSession } from '../auth/auth-queries';

// TODO in future we manage messages from constant
export const registerUserService = async (data: TUserPayload) => {
  const existUser = await findUserByEmail(data.email);

  if (existUser)
    return customResponse(
      CUSTOM_ERROR_CODES.CONFLICT,
      ERROR_CODES.CONFLICT,
      'User already exists'
    );

  data.password = bcrypt.hashSync(data.password, 10);
  await saveUser(data);
  return customResponse(
    STATUS_CODES.CREATED,
    STATUS_CODES.CREATED,
    'user created successfully'
  );
};


export const getUserDetailService = async (id: string) => {
  const user = await getUserById(id)
  if (!user) return customResponse(
    CUSTOM_ERROR_CODES.BAD_REQUEST,
    ERROR_CODES.BAD_REQUEST,
    'User not found'
  );

  return customResponse(
    STATUS_CODES.OK,
    STATUS_CODES.OK,
    'user found successfully',
    user
  );
}


export const getUserSessionsService = async (id: string) => {
  const session = await getUsersSession(id)
  if (!session) return customResponse(
    CUSTOM_ERROR_CODES.BAD_REQUEST,
    ERROR_CODES.BAD_REQUEST,
    'sessions not found'
  );

  return customResponse(
    STATUS_CODES.OK,
    STATUS_CODES.OK,
    'sessions found successfully',
    session
  );
}

export const sessionRevokeService = async (id: string) => {

  const revokedSession = revokeSession(id)

  return customResponse(
    STATUS_CODES.OK,
    STATUS_CODES.OK,
    'sessions revoked successfully',
  );
}
