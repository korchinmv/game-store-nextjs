import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import { ResponseGamesData } from "./ResponseGamesData";

export type RequestGameData = {
  gameName: string;
  numberPage: number;
};

export type LazyGetTriggerType = LazyQueryTrigger<
  QueryDefinition<
    RequestGameData,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      object,
      FetchBaseQueryMeta
    >,
    never,
    number[],
    "api"
  >
>;
