import { z } from "zod";
import { ZTheme } from "../themes/types";
import { GeneralListQueryParams, Pagination, ZStrapiFile } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------
export const ZContribution = z.object({
  id: z.number().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  job_title: z.string().optional(),
  description: z.string(),
  email: z.string(),
  status: z.string().optional(),
  link: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  theme: ZTheme.optional(),
  files: z
    .array(
      z.union([
        ZStrapiFile,
        typeof window === "undefined" ? z.null() : z.instanceof(File),
      ])
    )
    .optional(),
});
export type TContribution = z.infer<typeof ZContribution>;

export const ZContributionCreated = ZContribution;
export type TContributionCreated = z.infer<typeof ZContributionCreated>;

// -------------------------
// ----- POST PAYLOADS -----
// -------------------------
export const ZContributionCreationPayload = ZContribution;
export type TContributionCreationPayload = z.infer<
  typeof ZContributionCreationPayload
>;

// -------------------------
// ----- PUT PAYLOADS -----
// -------------------------
export const ZContributionUpdatePayload = ZContribution;
export type TContributionUpdatePayload = z.infer<
  typeof ZContributionUpdatePayload
>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZContributionDeletionPayload = z.object({
  id: z.number(),
});
export type TContributionDeletionPayload = z.infer<
  typeof ZContributionDeletionPayload
>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZContributionFindParams = z.object({
  id: z.number(),
});
export type TContributionFindParams = z.infer<typeof ZContributionFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type ContributionGetRoutes =
  | "/api/contributions/list"
  | "/api/contributions/find";
export type ContributionPostRoutes = "/api/contributions/create";
export type ContributionPutRoutes = "/api/contributions/update";
export type ContributionDeleteRoutes = "/api/contributions/delete";

//REQUESTS
export interface ContributionRoutesGetParams {
  "/api/contributions/list": GeneralListQueryParams | undefined;
  "/api/contributions/find": TContributionFindParams;
}
export interface ContributionRoutesPostParams {
  "/api/contributions/create": TContributionCreationPayload;
}
export interface ContributionRoutesPutParams {
  "/api/contributions/update": TContributionUpdatePayload;
}
export interface ContributionRoutesDeleteParams {
  "/api/contributions/delete": TContributionDeletionPayload;
}

//RESPONSES
export type ContributionRoutesDataResponses<T> =
  T extends "/api/contributions/list"
    ? { data: TContribution[]; pagination: Pagination }
    : T extends "/api/contributions/find"
    ? TContribution
    : T extends "/api/contributions/create"
    ? TContribution
    : T extends "/api/contributions/update"
    ? TContribution
    : T extends "/api/contributions/delete"
    ? TContribution
    : never;
