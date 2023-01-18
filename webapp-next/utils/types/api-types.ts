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
  RessourceDeleteRoutes,
  RessourceRoutesGetParams,
  RessourceRoutesDeleteParams,
} from "../../pages/api/ressources/types";
import {
  ThemeRoutesDataResponses,
  ThemeGetRoutes,
  ThemePostRoutes,
  ThemePutRoutes,
  ThemeDeleteRoutes,
  ThemeRoutesGetParams,
  ThemeRoutesPostParams,
  ThemeRoutesPutParams,
  ThemeRoutesDeleteParams,
} from "../../pages/api/themes/types";

import {
  PersonaeRoutesDataResponses,
  PersonaeGetRoutes,
  PersonaeRoutesGetParams,
} from "../../pages/api/personaes/types";
import {
  PersonaeOccupationRoutesDataResponses,
  PersonaeOccupationGetRoutes,
  PersonaeOccupationRoutesGetParams,
} from "../../pages/api/personaeoccupations/types";

import {
  SubThemeRoutesDataResponses,
  SubThemeGetRoutes,
  SubThemeRoutesGetParams,
} from "../../pages/api/subthemes/types";
import {
  UseCaseRoutesDataResponses,
  UseCaseGetRoutes,
  UseCaseDeleteRoutes,
  UseCaseRoutesGetParams,
  UseCaseRoutesDeleteParams,
} from "../../pages/api/usecases/types";
import {
  FeedBackDeleteRoutes,
  FeedBackGetRoutes,
  FeedBackPostRoutes,
  FeedBackPutRoutes,
  FeedBackRoutesDataResponses,
  FeedBackRoutesDeleteParams,
  FeedBackRoutesGetParams,
  FeedBackRoutesPostParams,
  FeedBackRoutesPutParams,
} from "../../pages/api/feedbacks/types";

export type DataResponses<T> =
  | AuthRoutesDataResponses<T>
  | UserRoutesDataResponses<T>
  | ThemeRoutesDataResponses<T>
  | RessourceRoutesDataResponses<T>
  | FeedBackRoutesDataResponses<T>
  | PersonaeRoutesDataResponses<T>
  | PersonaeOccupationRoutesDataResponses<T>
  | SubThemeRoutesDataResponses<T>
  | UseCaseRoutesDataResponses<T>;

export type MyGetRoutes =
  | AuthGetRoutes
  | UserGetRoutes
  | RessourceGetRoutes
  | ThemeGetRoutes
  | FeedBackGetRoutes
  | PersonaeGetRoutes
  | PersonaeOccupationGetRoutes
  | SubThemeGetRoutes
  | UseCaseGetRoutes;
export type MyPostRoutes =
  | AuthPostRoutes
  | UserPostRoutes
  | FeedBackPostRoutes
  | ThemePostRoutes;
export type MyPutRoutes = UserPutRoutes | FeedBackPutRoutes | ThemePutRoutes;
export type MyDeleteRoutes =
  | UserDeleteRoutes
  | RessourceDeleteRoutes
  | FeedBackDeleteRoutes
  | ThemeDeleteRoutes
  | UseCaseDeleteRoutes;

export interface GetRouteParams
  extends UserRoutesGetParams,
    UseCaseRoutesGetParams,
    RessourceRoutesGetParams,
    FeedBackRoutesGetParams,
    PersonaeRoutesGetParams,
    PersonaeOccupationRoutesGetParams,
    SubThemeRoutesGetParams,
    ThemeRoutesGetParams {}

export interface PostRouteParams
  extends AuthRoutesPostParams,
    UserRoutesPostParams,
    FeedBackRoutesPostParams,
    ThemeRoutesPostParams {}

export interface PutRouteParams
  extends UserRoutesPutParams,
    FeedBackRoutesPutParams,
    ThemeRoutesPutParams {}

export interface DeleteRouteParams
  extends UserRoutesDeleteParams,
    RessourceRoutesDeleteParams,
    UseCaseRoutesDeleteParams,
    FeedBackRoutesDeleteParams,
    ThemeRoutesDeleteParams {}
