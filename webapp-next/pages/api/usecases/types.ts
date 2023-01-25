import { z } from "zod";
import { GeneralListQueryParams, Pagination, ZStrapiFile } from "../types";
import { ressourceVideoSourceEnum } from "../../../utils/globals/enums";
import { ZRessource } from "../ressources/types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------

const ZUseCaseStep = z.object({
  id: z.number(),
  ressource: ZRessource,
  position: z.number(),
});

export const ZUseCase = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  image: z.optional(ZStrapiFile),
  steps: z.array(ZUseCaseStep),
});

export type TUseCase = z.infer<typeof ZUseCase>;

export const ZUseCaseCreated = ZUseCase;
export type TUseCaseCreated = z.infer<typeof ZUseCaseCreated>;

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
export const ZUseCaseCreationPayload = ZUseCase.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
  steps: true,
  image: true,
});
export type TUseCaseCreationPayload = z.infer<typeof ZUseCaseCreationPayload>;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
export const ZUseCaseUpdatePayload = ZUseCase;
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
  ? TUseCase
  : T extends "/api/usecases/update"
  ? TUseCase
  : T extends "/api/usecases/delete"
  ? TUseCase
  : never;
