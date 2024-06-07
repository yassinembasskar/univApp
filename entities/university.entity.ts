import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

// Define the University entity
@Entity()
export class University {
  @PrimaryGeneratedColumn()
  univId: number;

  @Column()
  univName: string;

  @Column({ nullable: true })
  univWebsite: string;

  @Column()
  univLocation: string;

  @Column()
  univLogo: string;

  @OneToMany(() => User, user => user.university)
  users: User[];
}