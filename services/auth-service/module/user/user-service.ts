import customResponse from '../../helpers/common/common-response';
import { findUserByEmail, saveUser } from './user-queries';
import bcrypt from 'bcrypt';
import { TUserPayload } from './user-types';
import {
  ERROR_CODES,
  CUSTOM_ERROR_CODES,
  STATUS_CODES,
} from '../../helpers/constants/status-codes';

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
