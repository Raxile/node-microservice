import { postgresPrisma } from '../../configs/prisma-db.config';

import { TUserPayload } from './user-types';

export const findUserByEmail = async (email: string) =>
  await postgresPrisma.user.findUnique({
    where: { email },
  });

export const saveUser = async (data: TUserPayload) =>
  await postgresPrisma.user.create({ data });
