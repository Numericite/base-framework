import { z } from "zod";

export interface ActiveSlugs {
  GET?: string[];
  POST?: string[];
  DELETE?: string[];
  PUT?: string[];
}

export interface StrapiResponseType<TResponseData> {
  status: number;
  data: TResponseData;
}

export type GeneralListQueryParams = {
  pagination: {
    page: number;
    pageSize: number;
  };
  [key: string]: any;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export const ZStrapiFile = z.object({
  id: z.number(),
  url: z.string(),
});
export type TStrapiFile = z.infer<typeof ZStrapiFile>;
