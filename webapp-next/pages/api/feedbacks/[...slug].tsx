import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, Pagination, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import {
  TFeedback,
  TFeedbackCreationPayload,
  TFeedbackDeletionPayload,
  TFeedbackUpdatePayload,
  ZFeedbackFindParams,
  ZFeedbackUpdatePayload,
} from "./types";
import {
  ZFeedback,
  ZFeedbackCreationPayload,
  ZFeedbackDeletionPayload,
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
    { data: TFeedback[]; pagination: Pagination } | TFeedback | number | string
  >
> => {
  switch (route) {
    case "list": {
      let { status, data } = await axios.get(`/feedbacks`, {
        params: routeParams,
      });
      return {
        status,
        data: {
          data: data.data.map((_: any) =>
            ZFeedback.parse(getRecursiveStrapiObject(_))
          ),
          pagination: data.meta.pagination,
        },
      };
    }
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZFeedbackFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/feedbacks/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZFeedback.parse(getRecursiveStrapiObject(data.data)),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/feedbacks/count`, {
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
): Promise<StrapiResponseType<TFeedback | string>> => {
  switch (route) {
    case "create": {
      const payload = JSON.parse(body);
      const params: TFeedbackCreationPayload =
        ZFeedbackCreationPayload.parse(payload);
      const { status, data } = await axios.post("/feedbacks", { data: params });
      return {
        status,
        data: ZFeedback.parse(getRecursiveStrapiObject(data.data)),
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
): Promise<StrapiResponseType<TFeedback | string>> => {
  switch (route) {
    case "update": {
      const payload = JSON.parse(body);
      const params: TFeedbackUpdatePayload =
        ZFeedbackUpdatePayload.parse(payload);
      const { status, data } = await axios.put(`/feedbacks/${params.id}`, {
        data: params,
      });
      return {
        status,
        data: ZFeedback.parse(getRecursiveStrapiObject(data.data)),
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
): Promise<StrapiResponseType<TFeedback | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TFeedbackDeletionPayload =
        ZFeedbackDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(`/feedbacks/${params.id}`);
      return { status, data: ZFeedback.parse(data) };
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
