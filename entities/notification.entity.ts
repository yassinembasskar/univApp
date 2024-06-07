import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notifId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.notifications)
  user: User;

  @Column()
  notifName: string;

  @Column()
  notifLink: string;

  @Column()
  notifType: string;

  @Column()
  notifDate: Date;

  @Column()
  notifStatus: string;
}
