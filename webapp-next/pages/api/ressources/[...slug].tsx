import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, Pagination, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import {
  TRessource,
  TRessourceCreationPayload,
  TRessourceDeletionPayload,
  TRessourceUpdatePayload,
  ZRessourceCreationPayload,
  ZRessourceFindParams,
  ZRessourceUpdatePayload,
} from "./types";
import { ZRessource, ZRessourceDeletionPayload } from "./types";
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
    | { data: TRessource[]; pagination: Pagination }
    | TRessource
    | number
    | string
  >
> => {
  switch (route) {
    case "list": {
      let { status, data } = await axios.get(`/ressources`, {
        params: routeParams,
      });
      return {
        status,
        data: {
          data: data.data.map((_: any) =>
            ZRessource.parse(getRecursiveStrapiObject(_))
          ),
          pagination: data.meta.pagination,
        },
      };
    }
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZRessourceFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/ressources/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZRessource.parse(getRecursiveStrapiObject(data.data)),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/ressources/count`, {
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
): Promise<StrapiResponseType<TRessource | string>> => {
  switch (route) {
    case "create": {
      const payload = JSON.parse(body);
      const params: TRessourceCreationPayload =
        ZRessourceCreationPayload.parse(payload);
      console.log(params);
      const { status, data } = await axios.post(`/ressources`, {
        data: params,
      });
      return {
        status,
        data: ZRessource.parse(getRecursiveStrapiObject(data.data)),
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
): Promise<StrapiResponseType<TRessource | string>> => {
  switch (route) {
    case "update": {
      const payload = JSON.parse(body);
      const params: TRessourceUpdatePayload =
        ZRessourceUpdatePayload.parse(payload);
      const { status, data } = await axios.put(
        `/ressources/${params.id}`,
        params
      );
      return {
        status,
        data: ZRessource.parse(getRecursiveStrapiObject(data.data)),
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
): Promise<StrapiResponseType<TRessource | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TRessourceDeletionPayload =
        ZRessourceDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(`/ressources/${params.id}`);
      return { status, data: ZRessource.parse(data) };
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
