import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, Pagination, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import {
  TUseCase,
  TUseCaseCreationPayload,
  TUseCaseDeletionPayload,
  TUseCaseUpdatePayload,
  TUseCaseWithoutSteps,
  ZUseCaseCreationPayload,
  ZUseCaseFindParams,
  ZUseCaseUpdatePayload,
  ZUseCaseWithoutSteps,
} from "./types";
import { ZUseCase, ZUseCaseDeletionPayload } from "./types";
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
    { data: TUseCase[]; pagination: Pagination } | TUseCase | number | string
  >
> => {
  switch (route) {
    case "list": {
      let { status, data } = await axios.get(`/use-cases`, {
        params: routeParams,
      });
      return {
        status,
        data: {
          data: data.data.map((_: any) =>
            ZUseCase.parse(getRecursiveStrapiObject(_))
          ),
          pagination: data.meta.pagination,
        },
      };
    }
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZUseCaseFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/use-cases/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZUseCase.parse(getRecursiveStrapiObject(data.data)),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/use-cases/count`, {
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
): Promise<StrapiResponseType<TUseCaseWithoutSteps | string>> => {
  switch (route) {
    case "create":
      const payload = JSON.parse(body);
      const params: TUseCaseCreationPayload =
        ZUseCaseCreationPayload.parse(payload);
      const { status, data } = await axios.post(`/use-cases`, {
        data: params,
      });
      return {
        status,
        data: ZUseCaseWithoutSteps.parse(getRecursiveStrapiObject(data.data)),
      };
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
): Promise<StrapiResponseType<TUseCaseWithoutSteps | string>> => {
  switch (route) {
    case "update":
      const payload = JSON.parse(body);
      const params: TUseCaseUpdatePayload =
        ZUseCaseUpdatePayload.parse(payload);
      const { status, data } = await axios.put(`/use-cases/${params.id}`, {
        data: params,
      });
      return {
        status,
        data: ZUseCaseWithoutSteps.parse(getRecursiveStrapiObject(data.data)),
      };
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
): Promise<StrapiResponseType<TUseCase | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TUseCaseDeletionPayload =
        ZUseCaseDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(`/use-cases/${params.id}`);
      return { status, data: ZUseCase.parse(data) };
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
