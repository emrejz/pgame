import { CountryCode } from 'src/commons/enums/country-code.enum';

export class PlayerResponseDto {
  id: string;
  username: string;
  countrycode: CountryCode;
  rank: number;
}
