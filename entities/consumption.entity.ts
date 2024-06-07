import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ConsumptionHistory {
  @PrimaryGeneratedColumn()
  consumptionId: number;

  @ManyToOne(() => User, user => user.consumptionHistories)
  user: User;

  @Column()
  consumptionDate: Date;

  @Column('decimal')
  consumptionAmount: number;

  @Column()
  consumptionWay: string;

  @Column()
  consumptionType: string;
}
