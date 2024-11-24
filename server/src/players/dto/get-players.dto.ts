import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsPositive,
  IsBoolean,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class GetPlayersDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 100;

  @IsOptional()
  @IsString()
  sortBy?: string = 'rank';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsString()
  search?: string = '';
}

export class GetPlayersFromRediDto {
  @IsOptional()
  @IsBoolean()
  byCountry?: boolean = false;
}

export class GetPlayersByRankNeighborsDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
