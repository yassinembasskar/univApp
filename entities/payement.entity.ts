import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PaymentHistory {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @ManyToOne(() => User, user => user.paymentHistories)
  user: User;

  @Column()
  paymentAmount: number;

  @Column()
  paymentReference: string;

  @Column({ nullable: true })
  usageStartDate: Date;

  @Column({ nullable: true })
  usageEndDate: Date;

  @Column()
  paymentDate: Date;
}
