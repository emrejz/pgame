import { Controller, Get, Body, Param } from '@nestjs/common';
import { PlayersService } from './players.service';
import { GetPlayersDto } from './dto/get-players.dto';
import { PlayerDto } from './dto/player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getPlayers(@Body() getPlayersDto: GetPlayersDto): Promise<PlayerDto[]> {
    return await this.playersService.findPlayers(getPlayersDto);
  }

  @Get('top')
  async getTopPlayersFromRedis(): Promise<PlayerDto[]> {
    return await this.playersService.findTopPlayersFromRedis();
  }

  @Get('search/:username')
  async getPlayerFromRedis(
    @Param('username') username: string,
  ): Promise<PlayerDto[]> {
    return await this.playersService.findPlayerFromRedis(username);
  }

  @Get('neighbors/:id')
  async getPlayerAndNeighbors(@Param('id') id: string): Promise<PlayerDto[]> {
    return await this.playersService.findPlayerAndNeighbors(id);
  }
}
