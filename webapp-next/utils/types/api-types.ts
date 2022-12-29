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
  ChatBotUserRoutesDataResponses,
  ChatBotUserGetRoutes,
  ChatBotUserRoutesGetParams,
} from "../../pages/api/chatbotusers/types";
import {
  ChatBotOccupationRoutesDataResponses,
  ChatBotOccupationGetRoutes,
  ChatBotOccupationRoutesGetParams,
} from "../../pages/api/chatbotoccupations/types";
import {
  ChatBotInformationRoutesDataResponses,
  ChatBotInformationGetRoutes,
  ChatBotInformationRoutesGetParams,
} from "../../pages/api/chatbotinformations/types";
import {
  ChatBotMoreInformationRoutesDataResponses,
  ChatBotMoreInformationGetRoutes,
  ChatBotMoreInformationRoutesGetParams,
} from "../../pages/api/chatbotmoreinformations/types";
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
  | ChatBotUserRoutesDataResponses<T>
  | ChatBotOccupationRoutesDataResponses<T>
  | ChatBotInformationRoutesDataResponses<T>
  | ChatBotMoreInformationRoutesDataResponses<T>
  | UseCaseRoutesDataResponses<T>;

export type MyGetRoutes =
  | AuthGetRoutes
  | UserGetRoutes
  | RessourceGetRoutes
  | ThemeGetRoutes
  | FeedBackGetRoutes
  | ChatBotUserGetRoutes
  | ChatBotOccupationGetRoutes
  | ChatBotInformationGetRoutes
  | ChatBotMoreInformationGetRoutes
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
    ChatBotUserRoutesGetParams,
    ChatBotOccupationRoutesGetParams,
    ChatBotInformationRoutesGetParams,
    ChatBotMoreInformationRoutesGetParams,
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
