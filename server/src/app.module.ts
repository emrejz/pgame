import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players/entities/player.entity';
import { SchedulerModule } from './scheduler/scheduler.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'emre',
      password: '123123',
      database: 'postgres',
      entities: [Player],
      synchronize: false,
    }),
    RedisModule,
    SchedulerModule,
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
