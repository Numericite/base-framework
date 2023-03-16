import { z } from "zod";
import { GeneralListQueryParams, Pagination, ZStrapiFile } from "../types";
import {
  ressourceKindEnum,
  ressourceVideoSourceEnum,
} from "../../../utils/globals/enums";
import { ZTheme } from "../themes/types";
import { ZSubTheme } from "../subthemes/types";
import { ZPersonae } from "../personaes/types";
import { ZPersonaeOccupation } from "../personaeoccupations/types";
import { ZContribution } from "../contributions/types";

// -----------------------------
// ----- STRAPI DATA TYPES -----
// -----------------------------
const ZRessourceKindEnum = z.enum(ressourceKindEnum);
export type TRessourceKindEnum = z.infer<typeof ZRessourceKindEnum>;

const ZRessourceLink = z.object({
  link: z.string(),
  kind: z.literal("link"),
});

const ZRessourceFile = z.object({
  files: z.array(ZStrapiFile).optional().nullable(),
  kind: z.literal("file"),
});

const ZRessourceQuiz = z.object({
  save_result: z.boolean(),
  questions: z.optional(
    z.array(
      z.object({
        name: z.string(),
        responses: z.array(
          z.object({
            name: z.string(),
            isRightAnswer: z.boolean(),
          })
        ),
      })
    )
  ),
  kind: z.literal("quiz"),
});

const ZRessourceVideo = z.object({
  link: z.string(),
  source: z.enum(ressourceVideoSourceEnum),
  kind: z.literal("video"),
});

const ZRessourceBase = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  content: z.string(),
  createdAt: z.optional(z.string()),
  updatedAt: z.optional(z.string()),
  publishedAt: z.optional(z.string()),
  theme: ZTheme.omit({
    personaes: true,
    sub_themes: true,
  }),
  sub_themes: z.array(ZSubTheme).or(z.object({})),
  personaes: z.array(ZPersonae).or(z.object({})),
  personae_occupations: z
    .array(
      ZPersonaeOccupation.omit({
        personae: true,
      })
    )
    .or(z.object({})),
  image: z.optional(ZStrapiFile.nullable()),
  child_id: z.number(),
  score: z.optional(z.number()),
  contribution: ZContribution.optional().nullable(),
  status: z.enum(["published", "draft"]),
});

const createOmits = {
  id: true,
  child_id: true,
  sub_themes: true,
  personaes: true,
  personae_occupations: true,
  contribution: true,
} as const;

const updateOmits = {
  sub_themes: true,
  personaes: true,
  personae_occupations: true,
  contribution: true,
} as const;

const createExtends = {
  sub_themes: z.array(z.number()),
  personaes: z.array(z.number()),
  personae_occupations: z.array(z.number()),
  contribution: z.number().optional().nullable(),
} as const;

export const ZRessource = z.discriminatedUnion("kind", [
  ZRessourceBase.extend(ZRessourceLink.shape),
  ZRessourceBase.extend(ZRessourceVideo.shape),
  ZRessourceBase.extend(ZRessourceQuiz.shape),
  ZRessourceBase.extend(ZRessourceFile.shape),
]);
export type TRessource = z.infer<typeof ZRessource>;

export const ZRessourceCreated = ZRessource;
export type TRessourceCreated = z.infer<typeof ZRessourceCreated>;

// // -------------------------
// // ----- POST PAYLOADS -----
// // -------------------------
export const ZRessourceCreationPayload = z.discriminatedUnion("kind", [
  ZRessourceBase.extend(ZRessourceLink.shape)
    .omit(createOmits)
    .extend(createExtends),
  ZRessourceBase.extend(ZRessourceVideo.shape)
    .omit(createOmits)
    .extend(createExtends),
  ZRessourceBase.extend(ZRessourceQuiz.shape)
    .omit(createOmits)
    .extend(createExtends),
  ZRessourceBase.extend(ZRessourceFile.shape)
    .omit({ ...createOmits, files: true })
    .extend({
      files: z.custom<File>().optional(),
      ...createExtends,
    }),
]);

export type TRessourceCreationPayload = z.infer<
  typeof ZRessourceCreationPayload
>;

// // -------------------------
// // ----- PUT PAYLOADS -----
// // -------------------------
export const ZRessourceUpdatePayload = z.discriminatedUnion("kind", [
  ZRessourceBase.extend(ZRessourceLink.shape)
    .omit(updateOmits)
    .extend(createExtends),
  ZRessourceBase.extend(ZRessourceVideo.shape)
    .omit(updateOmits)
    .extend(createExtends),
  ZRessourceBase.extend(ZRessourceQuiz.shape)
    .omit(updateOmits)
    .extend(createExtends),
  ZRessourceBase.extend(ZRessourceFile.shape)
    .omit(updateOmits)
    .omit({ ...updateOmits, files: true })
    .extend({
      files: z.custom<File>().optional(),
      ...createExtends,
    }),
]);

export type TRessourceUpdatePayload = z.infer<typeof ZRessourceUpdatePayload>;

// ---------------------------
// ----- DELETE PAYLOADS -----
// ---------------------------
export const ZRessourceDeletionPayload = z.object({
  id: z.number(),
});
export type TRessourceDeletionPayload = z.infer<
  typeof ZRessourceDeletionPayload
>;

// ------------------------------
// ----- GET SPECIAL PARAMS -----
// ------------------------------
export const ZRessourceFindParams = z.object({
  id: z.number(),
});
export type TRessourceFindParams = z.infer<typeof ZRessourceFindParams>;

export const ZRessourceAkinatorParams = z.object({
  occupation: z.number(),
  personae: z.number(),
  subTheme: z.number(),
  theme: z.number(),
});
export type TRessourceAkinatorParams = z.infer<
  typeof ZRessourceAkinatorParams
> &
  GeneralListQueryParams;

// -------------------------
// --- ROUTES DEFINITION ---
// -------------------------
export type RessourceGetRoutes =
  | "/api/ressources/list"
  | "/api/ressources/akinator"
  | "/api/ressources/find";
export type RessourcePostRoutes = "/api/ressources/create";
export type RessourcePutRoutes = "/api/ressources/update";
export type RessourceDeleteRoutes = "/api/ressources/delete";

//REQUESTS
export interface RessourceRoutesGetParams {
  "/api/ressources/list": GeneralListQueryParams | undefined;
  "/api/ressources/akinator": TRessourceAkinatorParams;
  "/api/ressources/find": TRessourceFindParams;
}
export interface RessourceRoutesPostParams {
  "/api/ressources/create": TRessourceCreationPayload;
}
export interface RessourceRoutesPutParams {
  "/api/ressources/update": TRessourceUpdatePayload;
}
export interface RessourceRoutesDeleteParams {
  "/api/ressources/delete": TRessourceDeletionPayload;
}

//RESPONSES
export type RessourceRoutesDataResponses<T> = T extends "/api/ressources/list"
  ? { data: TRessource[]; pagination: Pagination }
  : T extends "/api/ressources/akinator"
  ? { data: TRessource[]; pagination: Pagination }
  : T extends "/api/ressources/find"
  ? TRessource
  : T extends "/api/ressources/create"
  ? TRessource
  : T extends "/api/ressources/update"
  ? TRessource
  : T extends "/api/ressources/delete"
  ? TRessource
  : never;
