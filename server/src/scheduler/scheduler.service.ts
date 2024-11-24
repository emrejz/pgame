import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PlayersService } from '../players/players.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly playerService: PlayersService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async savePlayersToRedisByCron() {
    await this.playerService.savePlayersToRedisByCron();
  }
}
