import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import {
  TUser,
  TUserCreationPayload,
  TUserDeletionPayload,
  TUserUpdatePayload,
  ZUserFindParams,
  ZUserUpdatePayload,
} from "./types";
import { ZUser, ZUserCreationPayload, ZUserDeletionPayload } from "./types";
import { z } from "zod";
import { getRecursiveStrapiObject } from "../../../utils/api/parse-strapi-object";

const activeSlugs: ActiveSlugs = {
  GET: ["count", "find"],
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
): Promise<StrapiResponseType<TUser | number | string>> => {
  switch (route) {
    case "find": {
      const { id, ...otherParams } = routeParams;
      ZUserFindParams.parse({ id: parseInt(id as string) });
      let { status, data } = await axios.get(`/users/${id}`, {
        params: otherParams,
      });

      return {
        status,
        data: ZUser.parse(data),
      };
    }
    case "count": {
      const { status, data } = await axios.get(`/users/count`, {
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
): Promise<StrapiResponseType<TUser | string>> => {
  switch (route) {
    case "create": {
      const payload = JSON.parse(body);
      const params: TUserCreationPayload = ZUserCreationPayload.parse(payload);
      const { status, data } = await axios.post("/users", { data: params });
      return { status, data: ZUser.parse(getRecursiveStrapiObject(data.data)) };
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
): Promise<StrapiResponseType<TUser | string>> => {
  switch (route) {
    case "update": {
      const payload = JSON.parse(body);
      const params: TUserUpdatePayload = ZUserUpdatePayload.parse(payload);
      const { status, data } = await axios.put(`/users/${params.id}`, {
        data: params,
      });
      return {
        status,
        data: ZUser.parse(getRecursiveStrapiObject(data.data)),
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
): Promise<StrapiResponseType<TUser | string>> => {
  switch (route) {
    case "delete":
      const payload = JSON.parse(body);
      const params: TUserDeletionPayload = ZUserDeletionPayload.parse(payload);
      const { status, data } = await axios.delete(`/users/${params.id}`);
      return { status, data: ZUser.parse(data) };
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
