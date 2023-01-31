import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, Pagination, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import { TSubTheme, TSubThemeDeletionPayload, ZSubThemeFindParams } from "./types";
import { ZSubTheme, ZSubThemeDeletionPayload } from "./types";
import { z } from "zod";
import { getRecursiveStrapiObject } from "../../../utils/api/parse-strapi-object";

const activeSlugs: ActiveSlugs = {
  GET: ["list", "count", "find"],
  POST: ["create"],
  PUT: ["update"],
  DELETE: ["delete"],
};

const getMethods = async (
  route: string,
  routeParams: {
    [key: string]: string | string[];
  },
  axios: AxiosInstance
): Promise<
  StrapiResponseType<
    { data: TSubTheme[]; pagination: Pagination } | TSubTheme | number | string
  >
> => {
  switch (route) {
    case "list": {
      let { status, data } = await axios.get(`/sub-themes`, {
        params: routeParams,
      });
      return {
        status,
        data: {
          data: data.data.map((_: any) =>
            ZSubTheme.parse(getRecursiveStrapiObject(_))
          ),
          pagination: data.meta.pagination,
        },
      };
    }
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZSubThemeFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/sub-themes/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZSubTheme.parse(getRecursiveStrapiObject(data.data)),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/sub-themes/count`, {
        params: routeParams,
      });
      return { status, data: z.number().parse(data) };
    }
    default:
      return {
        status: 404,
        data: `No GET method found for ${route}`,
      };
  }
};

const postMethods = async (
  route: string,
  routeParams: {
    [key: string]: string | string[];
  },
  body: any,
  axios: AxiosInstance
): Promise<StrapiResponseType<TSubTheme | string>> => {
  switch (route) {
    default:
      return {
        status: 404,
        data: `No POST method found for ${route}`,
      };
  }
};

const putMethods = async (
  route: string,
  routeParams: {
    [key: string]: string | string[];
  },
  body: any,
  axios: AxiosInstance
): Promise<StrapiResponseType<TSubTheme | string>> => {
  switch (route) {
    default:
      return {
        status: 404,
        data: `No PUT method found for ${route}`,
      };
  }
};

const deleteMethods = async (
  route: string,
  routeParams: {
    [key: string]: string | string[];
  },
  body: any,
  axios: AxiosInstance
): Promise<StrapiResponseType<TSubTheme | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TSubThemeDeletionPayload =
        ZSubThemeDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(`/sub-themes/${params.id}`);
      return { status, data: ZSubTheme.parse(data) };
    default:
      return {
        status: 404,
        data: `No DELETE method found for ${route}`,
      };
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  nextToStrapiHandler(
    req,
    res,
    activeSlugs,
    getMethods,
    postMethods,
    putMethods,
    deleteMethods
  );
  return;
}
