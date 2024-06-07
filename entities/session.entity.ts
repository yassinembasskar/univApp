import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { PDF } from './pdf.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  sessionId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.sessions)
  user: User;

  @Column()
  sessionName: string;

  @Column()
  sessionDate: Date;

  @Column({nullable: true})
  sessionLink: string;

  @OneToMany(() => PDF, pdf => pdf.session)
  pdfs: PDF[];
}
