import { z } from "zod";
import { ZPersonae } from "../personaes/types";
import { GeneralListQueryParams, Pagination } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------

export const ZPersonaeOccupation = z.object({
  id: z.number(),
  name: z.string(),
  personae: ZPersonae
});

export type TPersonaeOccupation = z.infer<typeof ZPersonaeOccupation>;

export const ZPersonaeOccupationCreated = ZPersonaeOccupation;
export type TPersonaeOccupationCreated = z.infer<typeof ZPersonaeOccupationCreated>;

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
// export const ZPersonaeOccupationCreationPayload = ZPersonaeOccupation.omit({
//   id: true,
// });
// export type TPersonaeOccupationCreationPayload = z.infer<
//   typeof ZPersonaeOccupationCreationPayload
// >;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
// export const ZPersonaeOccupationUpdatePayload = ZPersonaeOccupation;
// export type TPersonaeOccupationUpdatePayload = z.infer<typeof ZPersonaeOccupationUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZPersonaeOccupationDeletionPayload = z.object({
  id: z.number(),
});
export type TPersonaeOccupationDeletionPayload = z.infer<typeof ZPersonaeOccupationDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZPersonaeOccupationFindParams = z.object({
  id: z.number(),
});
export type TPersonaeOccupationFindParams = z.infer<typeof ZPersonaeOccupationFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type PersonaeOccupationGetRoutes = "/api/personaeoccupations/list" | "/api/personaeoccupations/find";
// export type PersonaeOccupationPostRoutes = "/api/personaeoccupations/create";
// export type PersonaeOccupationPutRoutes = "/api/personaeoccupations/update";
export type PersonaeOccupationDeleteRoutes = "/api/personaeoccupations/delete";

//REQUESTS
export interface PersonaeOccupationRoutesGetParams {
  "/api/personaeoccupations/list": GeneralListQueryParams | undefined;
  "/api/personaeoccupations/find": TPersonaeOccupationFindParams;
}
// export interface PersonaeOccupationRoutesPostParams {
//   "/api/personaeoccupations/create": TPersonaeOccupationCreationPayload;
// }
// export interface PersonaeOccupationRoutesPutParams {
//   "/api/personaeoccupations/update": TPersonaeOccupationUpdatePayload;
// }
export interface PersonaeOccupationRoutesDeleteParams {
  "/api/personaeoccupations/delete": TPersonaeOccupationDeletionPayload;
}

//RESPONSES
export type PersonaeOccupationRoutesDataResponses<T> = T extends "/api/personaeoccupations/list"
  ? { data: TPersonaeOccupation[]; pagination: Pagination }
  : T extends "/api/personaeoccupations/find"
  ? TPersonaeOccupation
  : // : T extends "/api/personaeoccupations/create"
  // ? TPersonaeOccupation
  // : T extends "/api/personaeoccupations/update"
  // ? TPersonaeOccupation
  T extends "/api/personaeoccupations/delete"
  ? TPersonaeOccupation
  : never;