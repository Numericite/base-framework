import { z } from "zod";
import { GeneralListQueryParams, Pagination } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------
export const ZFeedback = z.object({
  id: z.number().optional(),
  appreciation: z.number(),
  description: z.string(),
  ressource: z.object({
    id: z.number(),
  }),
});
export type TFeedback = z.infer<typeof ZFeedback>;

export const ZFeedbackCreated = ZFeedback;
export type TFeedbackCreated = z.infer<typeof ZFeedbackCreated>;

// -------------------------
// ----- POST PAYLOADS -----
// -------------------------
export const ZFeedbackCreationPayload = ZFeedback;
export type TFeedbackCreationPayload = z.infer<typeof ZFeedbackCreationPayload>;

// -------------------------
// ----- PUT PAYLOADS -----
// -------------------------
export const ZFeedbackUpdatePayload = ZFeedback;
export type TFeedbackUpdatePayload = z.infer<typeof ZFeedbackUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZFeedbackDeletionPayload = z.object({
  id: z.number(),
});
export type TFeedbackDeletionPayload = z.infer<typeof ZFeedbackDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZFeedbackFindParams = z.object({
  id: z.number(),
});
export type TFeedbackFindParams = z.infer<typeof ZFeedbackFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type FeedBackGetRoutes = "/api/feedbacks/list" | "/api/feedbacks/find";
export type FeedBackPostRoutes = "/api/feedbacks/create";
export type FeedBackPutRoutes = "/api/feedbacks/update";
export type FeedBackDeleteRoutes = "/api/feedbacks/delete";

//REQUESTS
export interface FeedBackRoutesGetParams {
  "/api/feedbacks/list": GeneralListQueryParams | undefined;
  "/api/feedbacks/find": TFeedbackFindParams;
}
export interface FeedBackRoutesPostParams {
  "/api/feedbacks/create": TFeedbackCreationPayload;
}
export interface FeedBackRoutesPutParams {
  "/api/feedbacks/update": TFeedbackUpdatePayload;
}
export interface FeedBackRoutesDeleteParams {
  "/api/feedbacks/delete": TFeedbackDeletionPayload;
}

//RESPONSES
export type FeedBackRoutesDataResponses<T> = T extends "/api/feedbacks/list"
  ? { data: TFeedback[]; pagination: Pagination }
  : T extends "/api/feedbacks/find"
  ? TFeedback
  : T extends "/api/feedbacks/create"
  ? TFeedback
  : T extends "/api/feedbacks/update"
  ? TFeedback
  : T extends "/api/feedbacks/delete"
  ? TFeedback
  : never;
