import { Controller, Get, Body } from '@nestjs/common';
import { PlayersService } from './players.service';
import {
  GetPlayersDto,
  GetPlayersByRankNeighborsDto,
} from './dto/get-players.dto';
import { PlayerDto } from './dto/player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getPlayers(@Body() getPlayersDto: GetPlayersDto): Promise<PlayerDto[]> {
    return await this.playersService.findPlayers(getPlayersDto);
  }

  @Get('from-redis')
  async getPlayersFromRedis(): Promise<PlayerDto[]> {
    return await this.playersService.findPlayersFromRedis();
  }

  @Get('rank-neighbors')
  async getPlayersByRankNeighbors(
    @Body() getPlayersByRankNeighborsDto: GetPlayersByRankNeighborsDto,
  ): Promise<PlayerDto[]> {
    return await this.playersService.findRankNeighbors(
      getPlayersByRankNeighborsDto,
    );
  }
}
