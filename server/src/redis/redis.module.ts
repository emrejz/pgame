import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis(process.env.redis_url);
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
