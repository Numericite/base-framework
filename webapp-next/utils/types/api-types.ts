import {
  AuthGetRoutes,
  AuthPostRoutes,
  AuthRoutesDataResponses,
  AuthRoutesPostParams,
} from "../../pages/api/auth/types";
import {
  UserRoutesDataResponses,
  UserGetRoutes,
  UserPostRoutes,
  UserPutRoutes,
  UserDeleteRoutes,
  UserRoutesGetParams,
  UserRoutesPostParams,
  UserRoutesPutParams,
  UserRoutesDeleteParams,
} from "../../pages/api/users/types";

export type DataResponses<T> =
  | AuthRoutesDataResponses<T>
  | UserRoutesDataResponses<T>;

export type MyGetRoutes = AuthGetRoutes | UserGetRoutes;
export type MyPostRoutes = AuthPostRoutes | UserPostRoutes;
export type MyPutRoutes = UserPutRoutes;
export type MyDeleteRoutes = UserDeleteRoutes;

export interface GetRouteParams extends UserRoutesGetParams {}

export interface PostRouteParams
  extends AuthRoutesPostParams,
    UserRoutesPostParams {}

export interface PutRouteParams extends UserRoutesPutParams {}

export interface DeleteRouteParams extends UserRoutesDeleteParams {}
