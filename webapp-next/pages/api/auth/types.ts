import { z } from "zod";
import { ZUser } from "../users/types";
import type { TUser } from "../users/types";

// -------------------------
// ----- POST PAYLOADS -----
// -------------------------
export const ZLoginPayload = z.object({
  identifier: z.string(),
  password: z.string(),
});
export type TLoginPayload = z.infer<typeof ZLoginPayload>;

export const ZForgotPasswordPayload = z.object({
  email: z.string(),
});
export type TForgotPasswordPayload = z.infer<typeof ZForgotPasswordPayload>;

export const ZResetPasswordPayload = z.object({
  password: z.string(),
  passwordConfirmation: z.string(),
  code: z.string(),
});
export type TResetPasswordPayload = z.infer<typeof ZResetPasswordPayload>;

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------
export const ZLoginResponse = z.object({
  jwt: z.string(),
  user: ZUser,
});
export type TLoginResponse = z.infer<typeof ZLoginResponse>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type AuthPostRoutes =
  | "/api/auth/login"
  | "/api/auth/reset-password"
  | "/api/auth/forgot-password";
export type AuthGetRoutes = "/api/auth/me";

//REQUESTS
export interface AuthRoutesPostParams {
  "/api/auth/login": TLoginPayload;
  "/api/auth/reset-password": TResetPasswordPayload;
  "/api/auth/forgot-password": TForgotPasswordPayload;
}

//RESPONSES
export type AuthRoutesDataResponses<T> = T extends "/api/auth/login"
  ? TLoginResponse
  : T extends "/api/auth/me"
  ? TUser
  : T extends "/api/auth/reset-password"
  ? TLoginResponse
  : T extends "/api/auth/forgot-password"
  ? { ok: string }
  : never;
