import { z } from "zod";
import { ZChatBotMoreInformation } from "../chatbotmoreinformations/types";
import { ZChatBotUser } from "../chatbotusers/types";
import { GeneralListQueryParams, Pagination } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------

export const ZChatBotInformation = z.object({
  id: z.number(),
  information: z.string(),
  chat_bot_users: z.array(ZChatBotUser),
  chat_bot_more_informations: z.array(ZChatBotMoreInformation)
});

export type TChatBotInformation = z.infer<typeof ZChatBotInformation>;

export const ZChatBotInformationCreated = ZChatBotInformation;
export type TChatBotInformationCreated = z.infer<typeof ZChatBotInformationCreated>;

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
// export const ZChatBotInformationCreationPayload = ZChatBotInformation.omit({
//   id: true,
// });
// export type TChatBotInformationCreationPayload = z.infer<
//   typeof ZChatBotInformationCreationPayload
// >;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
// export const ZChatBotInformationUpdatePayload = ZChatBotInformation;
// export type TChatBotInformationUpdatePayload = z.infer<typeof ZChatBotInformationUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZChatBotInformationDeletionPayload = z.object({
  id: z.number(),
});
export type TChatBotInformationDeletionPayload = z.infer<typeof ZChatBotInformationDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZChatBotInformationFindParams = z.object({
  id: z.number(),
});
export type TChatBotInformationFindParams = z.infer<typeof ZChatBotInformationFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type ChatBotInformationGetRoutes = "/api/chatbotinformations/list" | "/api/chatbotinformations/find";
// export type ChatBotInformationPostRoutes = "/api/chatbotinformations/create";
// export type ChatBotInformationPutRoutes = "/api/chatbotinformations/update";
export type ChatBotInformationDeleteRoutes = "/api/chatbotinformations/delete";

//REQUESTS
export interface ChatBotInformationRoutesGetParams {
  "/api/chatbotinformations/list": GeneralListQueryParams | undefined;
  "/api/chatbotinformations/find": TChatBotInformationFindParams;
}
// export interface ChatBotInformationRoutesPostParams {
//   "/api/chatbotinformations/create": TChatBotInformationCreationPayload;
// }
// export interface ChatBotInformationRoutesPutParams {
//   "/api/chatbotinformations/update": TChatBotInformationUpdatePayload;
// }
export interface ChatBotInformationRoutesDeleteParams {
  "/api/chatbotinformations/delete": TChatBotInformationDeletionPayload;
}

//RESPONSES
export type ChatBotInformationRoutesDataResponses<T> = T extends "/api/chatbotinformations/list"
  ? { data: TChatBotInformation[]; pagination: Pagination }
  : T extends "/api/chatbotinformations/find"
  ? TChatBotInformation
  : // : T extends "/api/chatbotinformations/create"
  // ? ChatBotInformation
  // : T extends "/api/chatbotinformations/update"
  // ? ChatBotInformation
  T extends "/api/chatbotinformations/delete"
  ? TChatBotInformation
  : never;