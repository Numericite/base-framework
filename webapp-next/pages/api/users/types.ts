import { z } from "zod";
import { GeneralListQueryParams } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------
export const ZUser = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  blocked: z.boolean(),
});
export type TUser = z.infer<typeof ZUser>;

// -------------------------
// ----- POST PAYLOADS -----
// -------------------------
export const ZUserCreationPayload = ZUser.omit({
  id: true,
}).extend({
  password: z.string(),
});
export type TUserCreationPayload = z.infer<typeof ZUserCreationPayload>;

export const ZUserUpdatePayload = ZUser;
export type TUserUpdatePayload = z.infer<typeof ZUserUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZUserDeletionPayload = z.object({
  id: z.string(),
});
export type TUserDeletionPayload = z.infer<typeof ZUserDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZUserFindParams = z.object({
  id: z.string(),
});
export type TUserFindParams = z.infer<typeof ZUserFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type UserGetRoutes = "/api/users/list" | "/api/users/find";
export type UserPostRoutes = "/api/users/create";
export type UserPutRoutes = "/api/users/update";
export type UserDeleteRoutes = "/api/users/delete";

//REQUESTS
export interface UserRoutesGetParams {
  "/api/users/list": GeneralListQueryParams | undefined;
  "/api/users/find": TUserFindParams;
}
export interface UserRoutesPostParams {
  "/api/users/create": TUserCreationPayload;
}
export interface UserRoutesPutParams {
  "/api/users/update": TUserUpdatePayload;
}
export interface UserRoutesDeleteParams {
  "/api/users/delete": TUserDeletionPayload;
}

//RESPONSES
export type UserRoutesDataResponses<T> = T extends "/api/users/list"
  ? TUser[]
  : T extends "/api/users/find"
  ? TUser
  : T extends "/api/users/create"
  ? TUser
  : T extends "/api/users/update"
  ? TUser
  : T extends "/api/users/delete"
  ? TUser
  : never;
