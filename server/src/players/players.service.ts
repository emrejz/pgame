import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import {
  GetPlayersDto,
  GetPlayersFromRediDto,
  GetPlayersByRankNeighborsDto,
} from './dto/get-players.dto';
import { RedisService } from 'src/redis/redis.service';
import {
  REDIS_FIRST_100_PLAYERS_BY_COUNTRY_KEY,
  REDIS_FIRST_100_PLAYERS_KEY,
} from 'src/constants';
import { calculateRewards, sortPlayersByCountryAndRank } from './utils/index';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private readonly redisService: RedisService,
  ) {}

  async savePlayersToRedisByCron() {
    const players = await this.findPlayers({
      page: 1,
      limit: 100,
    });
    if (players.length === 0) {
      return;
    }

    const playerData = players.map((player) => {
      return {
        ...player,
        money: calculateRewards(player.rank - 1),
      };
    });

    await this.redisService.set(REDIS_FIRST_100_PLAYERS_KEY, playerData);
    await this.redisService.set(
      REDIS_FIRST_100_PLAYERS_BY_COUNTRY_KEY,
      sortPlayersByCountryAndRank(playerData),
    );
  }

  async findPlayersFromRedis(
    getPlayersFromRediDto: GetPlayersFromRediDto,
  ): Promise<Player[]> {
    const { byCountry } = getPlayersFromRediDto;
    if (byCountry) {
      return await this.redisService.get(
        REDIS_FIRST_100_PLAYERS_BY_COUNTRY_KEY,
      );
    }
    return await this.redisService.get(REDIS_FIRST_100_PLAYERS_KEY);
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
        rank: 'DESC',
        [sortBy]: order,
      },
    });

    return Players;
  }

  async findRankNeighbors(
    getPlayersByRankNeighborsDto: GetPlayersByRankNeighborsDto,
  ): Promise<Player[]> {
    const { id } = getPlayersByRankNeighborsDto;
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new Error('Player not found');
    }

    return await this.playerRepository.find({
      where: {
        rank: Between(player.rank - 1, player.rank + 2),
      },
      order: {
        rank: 'ASC',
      },
    });
  }
}
