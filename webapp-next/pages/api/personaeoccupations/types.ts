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
export type PersonaeOccupationDeleteRoutes = "/api/personaeoccupations/delete";

//REQUESTS
export interface PersonaeOccupationRoutesGetParams {
  "/api/personaeoccupations/list": GeneralListQueryParams | undefined;
  "/api/personaeoccupations/find": TPersonaeOccupationFindParams;
}
export interface PersonaeOccupationRoutesDeleteParams {
  "/api/personaeoccupations/delete": TPersonaeOccupationDeletionPayload;
}

//RESPONSES
export type PersonaeOccupationRoutesDataResponses<T> = T extends "/api/personaeoccupations/list"
  ? { data: TPersonaeOccupation[]; pagination: Pagination }
  : T extends "/api/personaeoccupations/find"
  ? TPersonaeOccupation
  : T extends "/api/personaeoccupations/delete"
  ? TPersonaeOccupation
  : never;
