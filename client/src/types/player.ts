import { countryNames } from "@/constants/country";

export type Player = {
  id: string;
  username: string;
  countrycode: keyof typeof countryNames;
  rank: number;
  money: number;
};
