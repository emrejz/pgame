import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index('IDX_USERNAME', ['username'])
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100 })
  country: string;

  @Column('int', { unique: true })
  rank: number;
}
