import { destroyJwt } from "../globals/cookies";
import { Overloading } from "./overloading";
import {
  MyGetRoutes,
  MyPostRoutes,
  MyPutRoutes,
  MyDeleteRoutes,
  GetRouteParams,
  PostRouteParams,
  PutRouteParams,
  DeleteRouteParams,
} from "../types/api-types";
import { removeUndefinedNestedFields } from "../globals/tools";

const serializeParams = (obj: any, prefix?: string): string => {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? serializeParams(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }
  return str.join("&");
};

const getRequest: Overloading<GetRouteParams, MyGetRoutes> = async <
  K extends MyGetRoutes
>(
  route: K,
  params?: any
) => {
  const urlParams = params
    ? "?" + serializeParams(removeUndefinedNestedFields(params))
    : "";
  let r = await fetch(process.env.NEXT_PUBLIC_URL + route + urlParams);
  if (r.ok) {
    const json = await r.json();
    return json;
  } else {
    if (r.status === 403 || r.status === 401) destroyJwt();
    throw r;
  }
};

const postRequest: Overloading<PostRouteParams, MyPostRoutes> = async <
  K extends MyPostRoutes
>(
  route: K,
  body?: any
) => {
  let r = await fetch(process.env.NEXT_PUBLIC_URL + route, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (r.ok) {
    const json = await r.json();
    return json;
  } else {
    if (r.status === 403 || r.status === 401) destroyJwt();
    throw r;
  }
};

const putRequest: Overloading<PutRouteParams, MyPutRoutes> = async <
  K extends MyPutRoutes
>(
  route: K,
  body?: any
) => {
  let r = await fetch(process.env.NEXT_PUBLIC_URL + route, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (r.ok) {
    const json = await r.json();
    return json;
  } else {
    if (r.status === 403 || r.status === 401) destroyJwt();
    throw r;
  }
};

const deleteRequest: Overloading<DeleteRouteParams, MyDeleteRoutes> = async <
  K extends MyDeleteRoutes
>(
  route: K,
  body?: any
) => {
  let r = await fetch(process.env.NEXT_PUBLIC_URL + route, {
    method: "DELETE",
    body: JSON.stringify(body),
  });
  if (r.ok) {
    const json = await r.json();
    return json;
  } else {
    if (r.status === 403 || r.status === 401) destroyJwt();
    throw r;
  }
};

export const fetchApi = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};
