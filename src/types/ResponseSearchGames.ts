import { ResponseGamesData } from "./ResponseGamesData";

export type ResponseSearchGames = Pick<
  ResponseGamesData,
  "count" | "next" | "previous" | "results"
>;
