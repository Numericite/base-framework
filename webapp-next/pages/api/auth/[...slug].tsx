import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, StrapiResponseType } from "../types";
import { AxiosInstance } from "axios";
import nextToStrapiHandler from "../../../utils/api/next-to-strapi-handler";
import {
  TForgotPasswordPayload,
  TLoginPayload,
  TLoginResponse,
  TResetPasswordPayload,
} from "./types";
import {
  ZLoginPayload,
  ZLoginResponse,
  ZForgotPasswordPayload,
  ZResetPasswordPayload,
} from "./types";
import type { TUser } from "../users/types";
import { ZUser } from "../users/types";

const activeSlugs: ActiveSlugs = {
  GET: ["me"],
  POST: ["login", "forgot-password", "reset-password"],
};

const getMethods = async (
  route: string,
  routeParams: {
    [key: string]: string | string[];
  },
  axios: AxiosInstance
): Promise<StrapiResponseType<TUser | string>> => {
  switch (route) {
    case "me": {
      const { status, data } = await axios.get("/users/me");
      return { status, data: ZUser.parse(data) };
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
): Promise<StrapiResponseType<TLoginResponse | string>> => {
  switch (route) {
    case "login": {
      const payload = JSON.parse(body);
      const params: TLoginPayload = ZLoginPayload.parse(payload);
      const { status, data } = await axios.post(`/auth/local`, params);
      return { status, data: ZLoginResponse.parse(data) };
    }
    case "forgot-password": {
      const payload = JSON.parse(body);
      const params: TForgotPasswordPayload =
        ZForgotPasswordPayload.parse(payload);
      const { status, data } = await axios.post(
        `/auth/forgot-password`,
        params
      );
      return { status, data };
    }
    case "reset-password": {
      const payload = JSON.parse(body);
      const params: TResetPasswordPayload =
        ZResetPasswordPayload.parse(payload);
      const { status, data } = await axios.post(`/auth/reset-password`, params);
      return { status, data };
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
): Promise<StrapiResponseType<string>> => {
  return {
    status: 404,
    data: `No PUT method found for ${route}`,
  };
};

const deleteMethods = async (
  route: string,
  routeParams: {
    [key: string]: string | string[];
  },
  body: any,
  axios: AxiosInstance
): Promise<StrapiResponseType<string>> => {
  return {
    status: 404,
    data: `No DELETE method found for ${route}`,
  };
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
