import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, Pagination, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import {
  TContribution,
  TContributionCreationPayload,
  TContributionDeletionPayload,
  TContributionUpdatePayload,
  ZContributionFindParams,
  ZContributionUpdatePayload,
} from "./types";
import {
  ZContribution,
  ZContributionCreationPayload,
  ZContributionDeletionPayload,
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
    | { data: TContribution[]; pagination: Pagination }
    | TContribution
    | number
    | string
  >
> => {
  switch (route) {
    case "list": {
      let { status, data } = await axios.get(`/contributions`, {
        params: routeParams,
      });
      return {
        status,
        data: {
          data: data.data.map((_: any) =>
            ZContribution.parse(getRecursiveStrapiObject(_))
          ),
          pagination: data.meta.pagination,
        },
      };
    }
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZContributionFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/contributions/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZContribution.parse(getRecursiveStrapiObject(data.data)),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/contributions/count`, {
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
): Promise<StrapiResponseType<TContribution | string>> => {
  switch (route) {
    case "create": {
      const payload = JSON.parse(body);
      const params: TContributionCreationPayload =
        ZContributionCreationPayload.parse(payload);
      const { status, data } = await axios.post("/contributions", {
        data: params,
      });
      return {
        status,
        data: ZContribution.parse(getRecursiveStrapiObject(data.data)),
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
): Promise<StrapiResponseType<TContribution | string>> => {
  switch (route) {
    case "update": {
      const payload = JSON.parse(body);
      const params: TContributionUpdatePayload =
        ZContributionUpdatePayload.parse(payload);
      const { status, data } = await axios.put(`/contributions/${params.id}`, {
        data: params,
      });
      return {
        status,
        data: ZContribution.parse(getRecursiveStrapiObject(data.data)),
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
): Promise<StrapiResponseType<TContribution | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TContributionDeletionPayload =
        ZContributionDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(
        `/contributions/${params.id}`
      );
      return { status, data: ZContribution.parse(data) };
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
