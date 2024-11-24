import { Controller, Get, Body } from '@nestjs/common';
import { PlayersService } from './players.service';
import {
  GetPlayersDto,
  GetPlayersFromRediDto,
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
  async getPlayersFromRedis(
    @Body() getPlayersFromRediDto: GetPlayersFromRediDto,
  ): Promise<PlayerDto[]> {
    return await this.playersService.findPlayersFromRedis(
      getPlayersFromRediDto,
    );
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
