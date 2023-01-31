import { z } from "zod";
import { GeneralListQueryParams, Pagination, ZStrapiFile } from "../types";
import { ZUseCaseStep } from "../usecasesteps/types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------

export const ZUseCase = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  image: z.optional(ZStrapiFile),
  steps: z.array(ZUseCaseStep),
});

export type TUseCase = z.infer<typeof ZUseCase>;

export const ZUseCaseWithoutSteps = ZUseCase.omit({
  steps: true,
});

export type TUseCaseWithoutSteps = z.infer<typeof ZUseCaseWithoutSteps>;

export const ZUseCaseCreated = ZUseCase;
export type TUseCaseCreated = z.infer<typeof ZUseCaseCreated>;

const createOmits = {
  id: true,
  createdAt: true,
  updatedAt: true,
  image: true,
  steps: true,
} as const;

const updateOmits = {
  createdAt: true,
  updatedAt: true,
  image: true,
  steps: true,
} as const;

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
export const ZUseCaseCreationPayload = ZUseCase.omit(createOmits);
export type TUseCaseCreationPayload = z.infer<typeof ZUseCaseCreationPayload>;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
export const ZUseCaseUpdatePayload = ZUseCase.omit(updateOmits);
export type TUseCaseUpdatePayload = z.infer<typeof ZUseCaseUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZUseCaseDeletionPayload = z.object({
  id: z.number(),
});
export type TUseCaseDeletionPayload = z.infer<typeof ZUseCaseDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZUseCaseFindParams = z.object({
  id: z.number(),
});
export type TUseCaseFindParams = z.infer<typeof ZUseCaseFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type UseCaseGetRoutes = "/api/usecases/list" | "/api/usecases/find";
export type UseCasePostRoutes = "/api/usecases/create";
export type UseCasePutRoutes = "/api/usecases/update";
export type UseCaseDeleteRoutes = "/api/usecases/delete";

//REQUESTS
export interface UseCaseRoutesGetParams {
  "/api/usecases/list": GeneralListQueryParams | undefined;
  "/api/usecases/find": TUseCaseFindParams;
}
export interface UseCaseRoutesPostParams {
  "/api/usecases/create": TUseCaseCreationPayload;
}
export interface UseCaseRoutesPutParams {
  "/api/usecases/update": TUseCaseUpdatePayload;
}
export interface UseCaseRoutesDeleteParams {
  "/api/usecases/delete": TUseCaseDeletionPayload;
}

//RESPONSES
export type UseCaseRoutesDataResponses<T> = T extends "/api/usecases/list"
  ? { data: TUseCase[]; pagination: Pagination }
  : T extends "/api/usecases/find"
  ? TUseCase
  : T extends "/api/usecases/create"
  ? TUseCaseWithoutSteps
  : T extends "/api/usecases/update"
  ? TUseCaseWithoutSteps
  : T extends "/api/usecases/delete"
  ? TUseCase
  : never;
