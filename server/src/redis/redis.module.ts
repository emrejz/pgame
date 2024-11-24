import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.redis_host,
          port: Number(process.env.redis_port),
        });
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
