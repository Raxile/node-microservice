import userModel from './user-model';
import { TUserPayload } from './user-types';

export const findUserByUsername = async (userName: string) =>
  userModel.findOne({ userName });

export const findUserByEmail = async (email: string) =>
  userModel.findOne({ email });

export const saveUser = async (payload: TUserPayload) =>
  await userModel.create(payload);
