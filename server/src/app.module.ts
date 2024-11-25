import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players/entities/player.entity';
import { SchedulerModule } from './scheduler/scheduler.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.sql_host,
      port: Number(process.env.sql_port),
      username: process.env.sql_username,
      password: process.env.sql_password,
      database: process.env.sql_database,
      entities: [Player],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    RedisModule,
    SchedulerModule,
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
