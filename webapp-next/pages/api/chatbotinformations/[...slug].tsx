import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, Pagination, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import { TChatBotInformation, TChatBotInformationDeletionPayload, ZChatBotInformationFindParams } from "./types";
import { ZChatBotInformation, ZChatBotInformationDeletionPayload } from "./types";
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
    { data: TChatBotInformation[]; pagination: Pagination } | TChatBotInformation | number | string
  >
> => {
  switch (route) {
    case "list": {
      let { status, data } = await axios.get(`/chat-bot-informations`, {
        params: routeParams,
      });
      return {
        status,
        data: {
          data: data.data.map((_: any) =>
            ZChatBotInformation.parse(getRecursiveStrapiObject(_))
          ),
          pagination: data.meta.pagination,
        },
      };
    }
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZChatBotInformationFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/chat-bot-informations/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZChatBotInformation.parse(getRecursiveStrapiObject(data.data)),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/chat-bot-informations/count`, {
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
): Promise<StrapiResponseType<TChatBotInformation | string>> => {
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
): Promise<StrapiResponseType<TChatBotInformation | string>> => {
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
): Promise<StrapiResponseType<TChatBotInformation | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TChatBotInformationDeletionPayload =
        ZChatBotInformationDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(`/chat-bot-informations/${params.id}`);
      return { status, data: ZChatBotInformation.parse(data) };
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
