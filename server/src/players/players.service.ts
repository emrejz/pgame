import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { GetPlayersDto } from './dto/get-players.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

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
}
