import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsPositive,
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
  sortBy?: string = 'score';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsString()
  search?: string = '';
}

export class GetPlayersByRankNeighborsDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
