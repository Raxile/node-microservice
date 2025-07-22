import { UUID } from "crypto";

export type TUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};


export type TSessionPayload = {
  userId: string
  refreshTokenHash?: string
  expiresAt?: Date
}
export type TLoginPayload = {
  email: string;
  password: string;
}