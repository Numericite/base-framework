import { z } from "zod";
import { GeneralListQueryParams, Pagination } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------

export const ZChatBotUser = z.object({
  id: z.number(),
  name: z.string(),
});

export type TChatBotUser = z.infer<typeof ZChatBotUser>;

export const ZChatBotUserCreated = ZChatBotUser;
export type TChatBotUserCreated = z.infer<typeof ZChatBotUserCreated>;

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
// export const ZChatBotUserCreationPayload = ZChatBotUser.omit({
//   id: true,
// });
// export type TChatBotUserCreationPayload = z.infer<
//   typeof ZChatBotUserCreationPayload
// >;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
// export const ZChatBotUserUpdatePayload = ZChatBotUser;
// export type TChatBotUserUpdatePayload = z.infer<typeof ZChatBotUserUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZChatBotUserDeletionPayload = z.object({
  id: z.number(),
});
export type TChatBotUserDeletionPayload = z.infer<typeof ZChatBotUserDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZChatBotUserFindParams = z.object({
  id: z.number(),
});
export type TChatBotUserFindParams = z.infer<typeof ZChatBotUserFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type ChatBotUserGetRoutes = "/api/chatbotusers/list" | "/api/chatbotusers/find";
// export type ChatBotUserPostRoutes = "/api/chatbotusers/create";
// export type ChatBotUserPutRoutes = "/api/chatbotusers/update";
export type ChatBotUserDeleteRoutes = "/api/chatbotusers/delete";

//REQUESTS
export interface ChatBotUserRoutesGetParams {
  "/api/chatbotusers/list": GeneralListQueryParams | undefined;
  "/api/chatbotusers/find": TChatBotUserFindParams;
}
// export interface ChatBotUserRoutesPostParams {
//   "/api/chatbotusers/create": TChatBotUserCreationPayload;
// }
// export interface ChatBotUserRoutesPutParams {
//   "/api/chatbotusers/update": TChatBotUserUpdatePayload;
// }
export interface ChatBotUserRoutesDeleteParams {
  "/api/chatbotusers/delete": TChatBotUserDeletionPayload;
}

//RESPONSES
export type ChatBotUserRoutesDataResponses<T> = T extends "/api/chatbotusers/list"
  ? { data: TChatBotUser[]; pagination: Pagination }
  : T extends "/api/chatbotusers/find"
  ? TChatBotUser
  : // : T extends "/api/chatbotusers/create"
  // ? TChatBotUser
  // : T extends "/api/chatbotusers/update"
  // ? TChatBotUser
  T extends "/api/chatbotusers/delete"
  ? TChatBotUser
  : never;