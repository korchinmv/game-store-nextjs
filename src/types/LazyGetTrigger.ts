import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import { ResponseGamesData } from "./ResponseGamesData";

export type LazyGetTriggerType = LazyQueryTrigger<
  QueryDefinition<
    ResponseGamesData,
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
