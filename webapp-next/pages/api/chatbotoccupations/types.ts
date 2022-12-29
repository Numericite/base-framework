import { z } from "zod";
import { ZChatBotUser } from "../chatbotusers/types";
import { GeneralListQueryParams, Pagination } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------

export const ZChatBotOccupation = z.object({
  id: z.number(),
  occupation: z.string(),
  chat_bot_user: ZChatBotUser
});

export type TChatBotOccupation = z.infer<typeof ZChatBotOccupation>;

export const ZChatBotOccupationCreated = ZChatBotOccupation;
export type TChatBotOccupationCreated = z.infer<typeof ZChatBotOccupationCreated>;

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
// export const ZChatBotOccupationCreationPayload = ZChatBotOccupation.omit({
//   id: true,
// });
// export type TChatBotOccupationCreationPayload = z.infer<
//   typeof ZChatBotOccupationCreationPayload
// >;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
// export const ZChatBotOccupationUpdatePayload = ZChatBotOccupation;
// export type TChatBotOccupationUpdatePayload = z.infer<typeof ZChatBotOccupationUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZChatBotOccupationDeletionPayload = z.object({
  id: z.number(),
});
export type TChatBotOccupationDeletionPayload = z.infer<typeof ZChatBotOccupationDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZChatBotOccupationFindParams = z.object({
  id: z.number(),
});
export type TChatBotOccupationFindParams = z.infer<typeof ZChatBotOccupationFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type ChatBotOccupationGetRoutes = "/api/chatbotoccupations/list" | "/api/chatbotoccupations/find";
// export type ChatBotOccupationPostRoutes = "/api/chatbotoccupations/create";
// export type ChatBotOccupationPutRoutes = "/api/chatbotoccupations/update";
export type ChatBotOccupationDeleteRoutes = "/api/chatbotoccupations/delete";

//REQUESTS
export interface ChatBotOccupationRoutesGetParams {
  "/api/chatbotoccupations/list": GeneralListQueryParams | undefined;
  "/api/chatbotoccupations/find": TChatBotOccupationFindParams;
}
// export interface ChatBotOccupationRoutesPostParams {
//   "/api/chatbotoccupations/create": TChatBotOccupationCreationPayload;
// }
// export interface ChatBotOccupationRoutesPutParams {
//   "/api/chatbotoccupations/update": TChatBotOccupationUpdatePayload;
// }
export interface ChatBotOccupationRoutesDeleteParams {
  "/api/chatbotoccupations/delete": TChatBotOccupationDeletionPayload;
}

//RESPONSES
export type ChatBotOccupationRoutesDataResponses<T> = T extends "/api/chatbotoccupations/list"
  ? { data: TChatBotOccupation[]; pagination: Pagination }
  : T extends "/api/chatbotoccupations/find"
  ? TChatBotOccupation
  : // : T extends "/api/chatbotoccupations/create"
  // ? TChatBotOccupation
  // : T extends "/api/chatbotoccupations/update"
  // ? TChatBotOccupation
  T extends "/api/chatbotoccupations/delete"
  ? TChatBotOccupation
  : never;