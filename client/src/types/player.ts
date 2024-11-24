import { countryNames } from "@/constants/country";

export type CountrycodeKey = keyof typeof countryNames;

export type Player = {
  id: string;
  username: string;
  countrycode: CountrycodeKey;
  rank: number;
  money: number;
  score: number;
};

export type PlayerKey = keyof Player;
