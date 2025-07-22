import { postgresPrisma } from '../../configs/prisma-db.config';

import { TUserPayload } from './user-types';

export const findUserByEmail = async (email: string) =>
  await postgresPrisma.user.findUnique({
    where: { email },
  });

export const saveUser = async (data: TUserPayload) =>
  await postgresPrisma.user.create({ data });


export const getUserById = async (id: string) => await postgresPrisma.user.findUnique({
  where: { id }, select: {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
  }
})

export const getUsersSession = async (userId: string) => await postgresPrisma.session.findMany({ where: { userId }, select: { id: true, isRevoked: true, createdAt: true, expiresAt: true } })