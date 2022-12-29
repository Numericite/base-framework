import { z } from "zod";
import { ZChatBotInformation } from "../chatbotinformations/types";
import { ZChatBotUser } from "../chatbotusers/types";
import { GeneralListQueryParams, Pagination } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------

export const ZChatBotMoreInformation = z.object({
  id: z.number(),
  information: z.string()
});

export type TChatBotMoreInformation = z.infer<typeof ZChatBotMoreInformation>;

export const ZChatBotMoreInformationCreated = ZChatBotMoreInformation;
export type TChatBotMoreInformationCreated = z.infer<typeof ZChatBotMoreInformationCreated>;

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
// export const ZChatBotMoreInformationCreationPayload = ZChatBotMoreInformation.omit({
//   id: true,
// });
// export type TChatBotMoreInformationCreationPayload = z.infer<
//   typeof ZChatBotMoreInformationCreationPayload
// >;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
// export const ZChatBotMoreInformationUpdatePayload = ZChatBotMoreInformation;
// export type TChatBotMoreInformationUpdatePayload = z.infer<typeof ZChatBotMoreInformationUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZChatBotMoreInformationDeletionPayload = z.object({
  id: z.number(),
});
export type TChatBotMoreInformationDeletionPayload = z.infer<typeof ZChatBotMoreInformationDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZChatBotMoreInformationFindParams = z.object({
  id: z.number(),
});
export type TChatBotMoreInformationFindParams = z.infer<typeof ZChatBotMoreInformationFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type ChatBotMoreInformationGetRoutes = "/api/chatbotmoreinformations/list" | "/api/chatbotmoreinformations/find";
// export type ChatBotMoreInformationPostRoutes = "/api/chatbotmoreinformations/create";
// export type ChatBotMoreInformationPutRoutes = "/api/chatbotmoreinformations/update";
export type ChatBotMoreInformationDeleteRoutes = "/api/chatbotmoreinformations/delete";

//REQUESTS
export interface ChatBotMoreInformationRoutesGetParams {
  "/api/chatbotmoreinformations/list": GeneralListQueryParams | undefined;
  "/api/chatbotmoreinformations/find": TChatBotMoreInformationFindParams;
}
// export interface ChatBotMoreInformationRoutesPostParams {
//   "/api/chatbotmoreinformations/create": TChatBotMoreInformationCreationPayload;
// }
// export interface ChatBotMoreInformationRoutesPutParams {
//   "/api/chatbotmoreinformations/update": TChatBotMoreInformationUpdatePayload;
// }
export interface ChatBotMoreInformationRoutesDeleteParams {
  "/api/chatbotmoreinformations/delete": TChatBotMoreInformationDeletionPayload;
}

//RESPONSES
export type ChatBotMoreInformationRoutesDataResponses<T> = T extends "/api/chatbotmoreinformations/list"
  ? { data: TChatBotMoreInformation[]; pagination: Pagination }
  : T extends "/api/chatbotmoreinformations/find"
  ? TChatBotMoreInformation
  : // : T extends "/api/chatbotmoreinformations/create"
  // ? ChatBotMoreInformation
  // : T extends "/api/chatbotmoreinformations/update"
  // ? ChatBotMoreInformation
  T extends "/api/chatbotmoreinformations/delete"
  ? TChatBotMoreInformation
  : never;