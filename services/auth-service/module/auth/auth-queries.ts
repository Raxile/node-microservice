import { UUID } from "crypto";
import { postgresPrisma } from "../../configs/prisma-db.config";
import { TSessionPayload, TUserPayload } from "../../helpers/types/common.types";

export const findUserByEmail = async (email: string) =>
  await postgresPrisma.user.findUnique({
    where: { email },
  });

export const saveUser = async (data: TUserPayload) =>
  await postgresPrisma.user.create({ data });

export const createSession = async (data: TSessionPayload) => await postgresPrisma.session.create({ data })

export const updateSessionRefreshHash = async (id: string, data: { refreshTokenHash: string, expiresAt: Date }) => await postgresPrisma.session.update({
  where: { id },
  data
});