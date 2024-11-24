import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsPositive,
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
  order?: 'ASC' | 'DESC' = 'DESC';

  @IsOptional()
  @IsString()
  search?: string = '';
}
