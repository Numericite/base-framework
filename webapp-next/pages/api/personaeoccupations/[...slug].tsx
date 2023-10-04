import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, Pagination, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import {
  TPersonaeOccupation,
  TPersonaeOccupationDeletionPayload,
  ZPersonaeOccupationFindParams,
} from "./types";
import {
  ZPersonaeOccupation,
  ZPersonaeOccupationDeletionPayload,
} from "./types";
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
    | { data: TPersonaeOccupation[]; pagination: Pagination }
    | TPersonaeOccupation
    | number
    | string
  >
> => {
  switch (route) {
    case "list": {
      let { status, data } = await axios.get(`/personae-occupations`, {
        params: routeParams,
      });

      return {
        status,
        data: {
          data: data.data.map((_: any) =>
            ZPersonaeOccupation.parse(getRecursiveStrapiObject(_))
          ),
          pagination: data.meta.pagination,
        },
      };
    }
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZPersonaeOccupationFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/personae-occupations/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZPersonaeOccupation.parse(getRecursiveStrapiObject(data.data)),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/personae-occupations/count`, {
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
): Promise<StrapiResponseType<TPersonaeOccupation | string>> => {
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
): Promise<StrapiResponseType<TPersonaeOccupation | string>> => {
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
): Promise<StrapiResponseType<TPersonaeOccupation | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TPersonaeOccupationDeletionPayload =
        ZPersonaeOccupationDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(
        `/personae-occupations/${params.id}`
      );
      return { status, data: ZPersonaeOccupation.parse(data) };
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
