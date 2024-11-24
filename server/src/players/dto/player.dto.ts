import { Player } from '../entities/player.entity';

export type PlayerDto = Player;
export type PlayerWithMoneyDto = Player & { money: number };
