import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, Pagination, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import {
  TTheme,
  TThemeCreationPayload,
  TThemeDeletionPayload,
  TThemeUpdatePayload,
  ZThemeFindParams,
  ZThemeUpdatePayload,
} from "./types";
import { ZTheme, ZThemeCreationPayload, ZThemeDeletionPayload } from "./types";
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
    { data: TTheme[]; pagination: Pagination } | TTheme | number | string
  >
> => {
  switch (route) {
    case "list": {
      let { status, data } = await axios.get(`/themes`, {
        params: routeParams,
      });
      return {
        status,
        data: {
          data: data.data.map((_: any) =>
            ZTheme.parse(getRecursiveStrapiObject(_))
          ),
          pagination: data.meta.pagination,
        },
      };
    }
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZThemeFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/themes/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZTheme.parse(getRecursiveStrapiObject(data.data)),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/themes/count`, {
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
): Promise<StrapiResponseType<TTheme | string>> => {
  switch (route) {
    case "create": {
      const payload = JSON.parse(body);
      const params: TThemeCreationPayload =
        ZThemeCreationPayload.parse(payload);
      const { status, data } = await axios.post("/themes", { data: params });
      return {
        status,
        data: ZTheme.parse(getRecursiveStrapiObject(data.data)),
      };
    }
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
): Promise<StrapiResponseType<TTheme | string>> => {
  switch (route) {
    case "update": {
      const payload = JSON.parse(body);
      const params: TThemeUpdatePayload = ZThemeUpdatePayload.parse(payload);
      const { status, data } = await axios.put(`/themes/${params.id}`, {
        data: params,
      });
      return {
        status,
        data: ZTheme.parse(getRecursiveStrapiObject(data.data)),
      };
    }
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
): Promise<StrapiResponseType<TTheme | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TThemeDeletionPayload =
        ZThemeDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(`/themes/${params.id}`);
      return { status, data: ZTheme.parse(data) };
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
