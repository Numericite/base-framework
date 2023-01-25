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
  RessourceRoutesPostParams,
  RessourceRoutesPutParams,
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
  UseCaseRoutesDataResponses,
  UseCasePostRoutes,
  UseCasePutRoutes,
  UseCaseGetRoutes,
  UseCaseDeleteRoutes,
  UseCaseRoutesGetParams,
  UseCaseRoutesDeleteParams,
  UseCaseRoutesPostParams,
  UseCaseRoutesPutParams,
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
import {
  ContributionDeleteRoutes,
  ContributionGetRoutes,
  ContributionPostRoutes,
  ContributionPutRoutes,
  ContributionRoutesDataResponses,
  ContributionRoutesDeleteParams,
  ContributionRoutesGetParams,
  ContributionRoutesPostParams,
  ContributionRoutesPutParams,
} from "../../pages/api/contributions/types";

export type DataResponses<T> =
  | AuthRoutesDataResponses<T>
  | UserRoutesDataResponses<T>
  | ThemeRoutesDataResponses<T>
  | RessourceRoutesDataResponses<T>
  | ContributionRoutesDataResponses<T>
  | FeedBackRoutesDataResponses<T>
  | UseCaseRoutesDataResponses<T>;

export type MyGetRoutes =
  | AuthGetRoutes
  | UserGetRoutes
  | RessourceGetRoutes
  | ContributionGetRoutes
  | ThemeGetRoutes
  | FeedBackGetRoutes
  | UseCaseGetRoutes;
export type MyPostRoutes =
  | AuthPostRoutes
  | UserPostRoutes
  | FeedBackPostRoutes
  | ContributionPostRoutes
  | RessourcePostRoutes
  | ThemePostRoutes
  | UseCasePostRoutes;
export type MyPutRoutes =
  | UserPutRoutes
  | FeedBackPutRoutes
  | ContributionPutRoutes
  | ThemePutRoutes
  | UseCasePutRoutes
  | RessourcePutRoutes;
export type MyDeleteRoutes =
  | UserDeleteRoutes
  | RessourceDeleteRoutes
  | FeedBackDeleteRoutes
  | ThemeDeleteRoutes
  | ContributionDeleteRoutes
  | UseCaseDeleteRoutes;

export interface GetRouteParams
  extends UserRoutesGetParams,
    UseCaseRoutesGetParams,
    RessourceRoutesGetParams,
    ContributionRoutesGetParams,
    FeedBackRoutesGetParams,
    ThemeRoutesGetParams {}

export interface PostRouteParams
  extends AuthRoutesPostParams,
    UserRoutesPostParams,
    FeedBackRoutesPostParams,
    RessourceRoutesPostParams,
    ContributionRoutesPostParams,
    UseCaseRoutesPostParams,
    ThemeRoutesPostParams {}

export interface PutRouteParams
  extends UserRoutesPutParams,
    FeedBackRoutesPutParams,
    RessourceRoutesPutParams,
    ContributionRoutesPutParams,
    UseCaseRoutesPutParams,
    ThemeRoutesPutParams {}

export interface DeleteRouteParams
  extends UserRoutesDeleteParams,
    RessourceRoutesDeleteParams,
    UseCaseRoutesDeleteParams,
    FeedBackRoutesDeleteParams,
    ContributionRoutesDeleteParams,
    RessourceRoutesDeleteParams,
    ThemeRoutesDeleteParams {}
