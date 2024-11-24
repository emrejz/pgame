import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { CountryCode } from '../../commons/enums/country-code.enum';

@Entity()
@Index('IDX_USERNAME', ['username'])
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: CountryCode,
  })
  countrycode: CountryCode;

  @Column('int', { unique: true })
  rank: number;
}
