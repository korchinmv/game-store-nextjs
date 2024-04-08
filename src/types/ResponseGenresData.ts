import { Response } from "./Response";

export type ResponseGenresData = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Response[];
};
