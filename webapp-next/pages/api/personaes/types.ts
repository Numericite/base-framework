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

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
// export const ZPersonaeCreationPayload = ZPersonae.omit({
//   id: true,
// });
// export type TPersonaeCreationPayload = z.infer<
//   typeof ZPersonaeCreationPayload
// >;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
// export const ZPersonaeUpdatePayload = ZPersonae;
// export type TPersonaeUpdatePayload = z.infer<typeof ZPersonaeUpdatePayload>;

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
// export type PersonaePostRoutes = "/api/personaes/create";
// export type PersonaePutRoutes = "/api/personaes/update";
export type PersonaeDeleteRoutes = "/api/personaes/delete";

//REQUESTS
export interface PersonaeRoutesGetParams {
  "/api/personaes/list": GeneralListQueryParams | undefined;
  "/api/personaes/find": TPersonaeFindParams;
}
// export interface PersonaeRoutesPostParams {
//   "/api/personaes/create": TPersonaeCreationPayload;
// }
// export interface PersonaeRoutesPutParams {
//   "/api/personaes/update": TPersonaeUpdatePayload;
// }
export interface PersonaeRoutesDeleteParams {
  "/api/personaes/delete": TPersonaeDeletionPayload;
}

//RESPONSES
export type PersonaeRoutesDataResponses<T> = T extends "/api/personaes/list"
  ? { data: TPersonae[]; pagination: Pagination }
  : T extends "/api/personaes/find"
  ? TPersonae
  : // : T extends "/api/personaes/create"
  // ? TPersonae
  // : T extends "/api/personaes/update"
  // ? TPersonae
  T extends "/api/personaes/delete"
  ? TPersonae
  : never;