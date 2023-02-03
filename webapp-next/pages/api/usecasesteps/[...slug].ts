import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, Pagination, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import {
  TUseCaseStep,
  TUseCaseStepCreationPayload,
  TUseCaseStepDeletionPayload,
  TUseCaseStepUpdatePayload,
  TUseCaseStepWithoutRessource,
  ZUseCaseStepCreationPayload,
  ZUseCaseStepFindParams,
  ZUseCaseStepUpdatePayload,
  ZUseCaseStepWithoutRessource,
} from "./types";
import { ZUseCaseStep, ZUseCaseStepDeletionPayload } from "./types";
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
    | { data: TUseCaseStep[]; pagination: Pagination }
    | TUseCaseStep
    | number
    | string
  >
> => {
  switch (route) {
    case "list": {
      let { status, data } = await axios.get(`/use-case-steps`, {
        params: routeParams,
      });
      return {
        status,
        data: {
          data: data.data.map((_: any) =>
            ZUseCaseStep.parse(getRecursiveStrapiObject(_))
          ),
          pagination: data.meta.pagination,
        },
      };
    }
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZUseCaseStepFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/use-case-steps/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZUseCaseStep.parse(getRecursiveStrapiObject(data.data)),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/use-case-steps/count`, {
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
): Promise<StrapiResponseType<TUseCaseStepWithoutRessource | string>> => {
  switch (route) {
    case "create":
      const payload = JSON.parse(body);
      const params: TUseCaseStepCreationPayload =
        ZUseCaseStepCreationPayload.parse(payload);
      const { status, data } = await axios.post(`/use-case-steps`, {
        data: params,
      });
      return {
        status,
        data: ZUseCaseStepWithoutRessource.parse(
          getRecursiveStrapiObject(data.data)
        ),
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
): Promise<StrapiResponseType<TUseCaseStepWithoutRessource | string>> => {
  switch (route) {
    case "update":
      const payload = JSON.parse(body);
      const params: TUseCaseStepUpdatePayload =
        ZUseCaseStepUpdatePayload.parse(payload);

      const { status, data } = await axios.put(`/use-case-steps/${params}`, {
        data: params,
      });
      return {
        status,
        data: ZUseCaseStepWithoutRessource.parse(
          getRecursiveStrapiObject(data.data)
        ),
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
): Promise<StrapiResponseType<TUseCaseStepWithoutRessource | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TUseCaseStepDeletionPayload =
        ZUseCaseStepDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(`/use-case/${params.id}`);
      return { status, data: ZUseCaseStepWithoutRessource.parse(data) };
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
