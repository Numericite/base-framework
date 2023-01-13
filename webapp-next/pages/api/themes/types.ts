import { z } from "zod";
import { GeneralListQueryParams, Pagination, ZStrapiFile } from "../types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------
export const ZTheme = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.optional(ZStrapiFile),
  color: z.string().optional(),
});
export type TTheme = z.infer<typeof ZTheme>;

export const ZThemeCreated = ZTheme;
export type TThemeCreated = z.infer<typeof ZThemeCreated>;

// -------------------------
// ----- POST PAYLOADS -----
// -------------------------
export const ZThemeCreationPayload = ZTheme.omit({
  id: true,
});
export type TThemeCreationPayload = z.infer<typeof ZThemeCreationPayload>;

// -------------------------
// ----- PUT PAYLOADS -----
// -------------------------
export const ZThemeUpdatePayload = ZTheme;
export type TThemeUpdatePayload = z.infer<typeof ZThemeUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZThemeDeletionPayload = z.object({
  id: z.number(),
});
export type TThemeDeletionPayload = z.infer<typeof ZThemeDeletionPayload>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZThemeFindParams = z.object({
  id: z.number(),
});
export type TThemeFindParams = z.infer<typeof ZThemeFindParams>;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type ThemeGetRoutes = "/api/themes/list" | "/api/themes/find";
export type ThemePostRoutes = "/api/themes/create";
export type ThemePutRoutes = "/api/themes/update";
export type ThemeDeleteRoutes = "/api/themes/delete";

//REQUESTS
export interface ThemeRoutesGetParams {
  "/api/themes/list": GeneralListQueryParams | undefined;
  "/api/themes/find": TThemeFindParams;
}
export interface ThemeRoutesPostParams {
  "/api/themes/create": TThemeCreationPayload;
}
export interface ThemeRoutesPutParams {
  "/api/themes/update": TThemeUpdatePayload;
}
export interface ThemeRoutesDeleteParams {
  "/api/themes/delete": TThemeDeletionPayload;
}

//RESPONSES
export type ThemeRoutesDataResponses<T> = T extends "/api/themes/list"
  ? { data: TTheme[]; pagination: Pagination }
  : T extends "/api/themes/find"
  ? TTheme
  : T extends "/api/themes/create"
  ? TTheme
  : T extends "/api/themes/update"
  ? TTheme
  : T extends "/api/themes/delete"
  ? TTheme
  : never;
