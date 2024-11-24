import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { GetPlayersDto } from './dto/get-players.dto';
import { RedisService } from 'src/redis/redis.service';
import {
  REDIS_ALL_PLAYERS_KEY,
  REDIS_FIRST_100_PLAYERS_KEY,
} from 'src/constants';
import { calculateRewards } from './utils/index';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly redisService: RedisService,
  ) {}

  async savePlayersToRedisByCron() {
    const players = await this.playerRepository.find({
      order: {
        score: 'DESC',
      },
    });
    if (players.length === 0) {
      return;
    }
    const playerData = players.map((player, index) => {
      return {
        ...player,
        money: calculateRewards(index),
        rank: index + 1,
      };
    });
    await this.redisService.set(
      REDIS_FIRST_100_PLAYERS_KEY,
      playerData.slice(0, 100),
    );
    await this.redisService.set(REDIS_ALL_PLAYERS_KEY, playerData);
  }

  async findTopPlayersFromRedis(): Promise<Player[]> {
    return await this.redisService.get(REDIS_FIRST_100_PLAYERS_KEY);
  }

  async findPlayerFromRedis(username: string): Promise<Player[]> {
    const players: Player[] = await this.redisService.get(
      REDIS_ALL_PLAYERS_KEY,
    );
    return players.filter((player) =>
      player.username.toLowerCase().includes(username.toLowerCase()),
    );
  }

  async findPlayers(getPlayersDto: GetPlayersDto): Promise<Player[]> {
    const { page, limit, sortBy, order, search } = getPlayersDto;

    const skip = (page - 1) * limit;
    const take = limit;

    const searchCondition = search ? { username: ILike(`%${search}%`) } : {};
    const Players = await this.playerRepository.find({
      where: searchCondition,
      skip,
      take,
      order: {
        [sortBy]: order,
      },
    });

    return Players;
  }

  async findPlayerAndNeighbors(id: string): Promise<Player[]> {
    let index;
    const players = await this.redisService.get<Player[]>(
      REDIS_ALL_PLAYERS_KEY,
    );
    const player = players?.find((player, i) => {
      index = i;
      return player.id === id;
    });

    if (!player) {
      throw new Error('Player not found');
    }
    return players.slice(Math.max(index - 1, 0), index + 3);
  }
}
