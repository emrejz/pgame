import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PlayersModule } from '../players/players.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [ScheduleModule.forRoot(), PlayersModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
