import { z } from "zod";
import { GeneralListQueryParams, Pagination, ZStrapiFile } from "../types";
import { ZRessource } from "../ressources/types";
import { ZUseCase } from "../usecases/types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------

export const ZUseCaseStep = z.object({
  id: z.number(),
  ressource: ZRessource,
  position: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TUseCaseStep = z.infer<typeof ZUseCaseStep>;

export const ZUseCaseStepWithoutRessource = ZUseCaseStep.omit({
  ressource: true,
});

export type TUseCaseStepWithoutRessource = z.infer<
  typeof ZUseCaseStepWithoutRessource
>;

export const ZUseCaseStepCreated = ZUseCaseStep;
export type TUseCaseStepCreated = z.infer<typeof ZUseCaseStepCreated>;

const createOmits = {
  id: true,
  ressource: true,
  createdAt: true,
  updatedAt: true,
} as const;

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
export const ZUseCaseStepCreationPayload = ZUseCaseStep.omit(
  createOmits
).extend({
  ressource: z.number(),
  use_case: z.number(),
});
export type TUseCaseStepCreationPayload = z.infer<
  typeof ZUseCaseStepCreationPayload
>;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
export const ZUseCaseStepUpdatePayload = ZUseCaseStep.omit(createOmits).extend({
  ressource: z.number(),
  use_case: z.number(),
});
export type TUseCaseStepUpdatePayload = z.infer<
  typeof ZUseCaseStepUpdatePayload
>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZUseCaseStepDeletionPayload = z.object({
  id: z.number(),
});
export type TUseCaseStepDeletionPayload = z.infer<
  typeof ZUseCaseStepDeletionPayload
>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZUseCaseStepFindParams = z.object({
  id: z.number(),
});
export type TUseCaseStepFindParams = z.infer<typeof ZUseCaseStepFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type UseCaseStepGetRoutes =
  | "/api/usecasesteps/list"
  | "/api/usecasesteps/find";
export type UseCaseStepPostRoutes = "/api/usecasesteps/create";
export type UseCaseStepPutRoutes = "/api/usecasesteps/update";
export type UseCaseStepDeleteRoutes = "/api/usecasesteps/delete";

//REQUESTS
export interface UseCaseStepRoutesGetParams {
  "/api/usecasesteps/list": GeneralListQueryParams | undefined;
  "/api/usecasesteps/find": TUseCaseStepFindParams;
}
export interface UseCaseStepRoutesPostParams {
  "/api/usecasesteps/create": TUseCaseStepCreationPayload;
}
export interface UseCaseStepRoutesPutParams {
  "/api/usecasesteps/update": TUseCaseStepUpdatePayload;
}
export interface UseCaseStepRoutesDeleteParams {
  "/api/usecasesteps/delete": TUseCaseStepDeletionPayload;
}

//RESPONSES
export type UseCaseStepRoutesDataResponses<T> =
  T extends "/api/usecasesteps/list"
    ? { data: TUseCaseStep[]; pagination: Pagination }
    : T extends "/api/usecasesteps/find"
    ? TUseCaseStep
    : T extends "/api/usecasesteps/create"
    ? TUseCaseStepWithoutRessource
    : T extends "/api/usecasesteps/update"
    ? TUseCaseStepWithoutRessource
    : T extends "/api/usecasesteps/delete"
    ? TUseCaseStepWithoutRessource
    : never;
