import { Controller, Get, Body } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerResponseDto } from './dto/player-response.dto';
import { GetPlayersDto } from './dto/get-players.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getPlayers(
    @Body() getPlayersDto: GetPlayersDto,
  ): Promise<PlayerResponseDto[]> {
    return await this.playersService.findPlayers(getPlayersDto);
  }
}
