import { z } from "zod";
import { GeneralListQueryParams, Pagination } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------

export const ZPersonae = z.object({
  id: z.number(),
  name: z.string(),
});

export type TPersonae = z.infer<typeof ZPersonae>;

export const ZPersonaeCreated = ZPersonae;
export type TPersonaeCreated = z.infer<typeof ZPersonaeCreated>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZPersonaeDeletionPayload = z.object({
  id: z.number(),
});
export type TPersonaeDeletionPayload = z.infer<typeof ZPersonaeDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZPersonaeFindParams = z.object({
  id: z.number(),
});
export type TPersonaeFindParams = z.infer<typeof ZPersonaeFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type PersonaeGetRoutes = "/api/personaes/list" | "/api/personaes/find";
export type PersonaeDeleteRoutes = "/api/personaes/delete";

//REQUESTS
export interface PersonaeRoutesGetParams {
  "/api/personaes/list": GeneralListQueryParams | undefined;
  "/api/personaes/find": TPersonaeFindParams;
}
export interface PersonaeRoutesDeleteParams {
  "/api/personaes/delete": TPersonaeDeletionPayload;
}

//RESPONSES
export type PersonaeRoutesDataResponses<T> = T extends "/api/personaes/list"
  ? { data: TPersonae[]; pagination: Pagination }
  : T extends "/api/personaes/find"
  ? TPersonae
  : T extends "/api/personaes/delete"
  ? TPersonae
  : never;
