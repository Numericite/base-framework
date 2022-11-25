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
import {
  RessourceRoutesDataResponses,
  RessourceGetRoutes,
  RessourcePostRoutes,
  RessourcePutRoutes,
  RessourceDeleteRoutes,
  RessourceRoutesGetParams,
  RessourceRoutesDeleteParams,
} from "../../pages/api/ressources/types";

export type DataResponses<T> =
  | AuthRoutesDataResponses<T>
  | UserRoutesDataResponses<T>
  | RessourceRoutesDataResponses<T>;

export type MyGetRoutes = AuthGetRoutes | UserGetRoutes | RessourceGetRoutes;
export type MyPostRoutes =
  | AuthPostRoutes
  | UserPostRoutes
  | RessourcePostRoutes;
export type MyPutRoutes = UserPutRoutes | RessourcePutRoutes;
export type MyDeleteRoutes = UserDeleteRoutes | RessourceDeleteRoutes;

export interface GetRouteParams
  extends UserRoutesGetParams,
    RessourceRoutesGetParams {}

export interface PostRouteParams
  extends AuthRoutesPostParams,
    UserRoutesPostParams {}

export interface PutRouteParams extends UserRoutesPutParams {}

export interface DeleteRouteParams
  extends UserRoutesDeleteParams,
    RessourceRoutesDeleteParams {}
