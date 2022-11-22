import { AxiosInstance } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { ActiveSlugs, StrapiResponseType } from "../../pages/api/types";
import axiosInstance from "../hooks/useAxios";
import { getUsableParams } from "./params";

interface GetMethodsHandler {
  (
    route: string,
    routeParams: {
      [key: string]: string | string[];
    },
    axios: AxiosInstance
  ): Promise<StrapiResponseType<any>>;
}

interface PostMethodsHandler<TBody> {
  (
    route: string,
    routeParams: {
      [key: string]: string | string[];
    },
    body: TBody,
    axios: AxiosInstance
  ): Promise<StrapiResponseType<any>>;
}

interface PutMethodsHandler<TBody> {
  (
    route: string,
    routeParams: {
      [key: string]: string | string[];
    },
    body: TBody,
    axios: AxiosInstance
  ): Promise<StrapiResponseType<any>>;
}

interface DeleteMethodsHandler<TBody> {
  (
    route: string,
    routeParams: {
      [key: string]: string | string[];
    },
    body: TBody,
    axios: AxiosInstance
  ): Promise<StrapiResponseType<any>>;
}

const handler = async <ActiveSlugsKey extends keyof ActiveSlugs>(
  req: NextApiRequest,
  res: NextApiResponse,
  activeSlugs: ActiveSlugs,
  getMethods: GetMethodsHandler,
  postMethods: PostMethodsHandler<any>,
  putMethods: PutMethodsHandler<any>,
  deleteMethods: DeleteMethodsHandler<any>
) => {
  const {
    method,
    headers: { cookie },
    query: { slug, ...params },
    body,
  } = req;

  const route = slug ? (slug[0] as string) : "";
  const routeParams = getUsableParams(params);

  if (
    !activeSlugs[method as ActiveSlugsKey] ||
    !activeSlugs[method as ActiveSlugsKey]?.includes(route)
  ) {
    res.statusCode = 404;
    res.send({ Error: "Slug not found for method '" + method + "'" });
    return;
  }

  const axios = axiosInstance(cookie as string);

  try {
    let response;
    if (method === "GET") {
      response = await getMethods(route, routeParams, axios);
    } else if (method === "POST") {
      response = await postMethods(route, routeParams, body, axios);
    } else if (method === "PUT") {
      response = await putMethods(route, routeParams, body, axios);
    } else if (method === "DELETE") {
      response = await deleteMethods(route, routeParams, body, axios);
    } else {
      return;
    }

    res.statusCode = response?.status as number;
    res.send(response?.data);
  } catch (err: any) {
    res.statusCode = err.response?.status || 500;
    res.send(err.response?.data || err);
  }
};

export default handler;
