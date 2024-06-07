import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  problemId: number;

  @ManyToOne(() => User, user => user.problems)
  user: User;

  @Column()
  problemTitle: string;

  @Column()
  problemContent: string;

  @Column()
  problemSource: string;

  @Column()
  problemStatus: string;

  @Column({ nullable: true })
  problemResponse: string;

  @Column()
  problemDate: Date;
}
