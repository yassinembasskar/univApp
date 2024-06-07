import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Session } from './session.entity'; 

@Entity()
export class PDF {
  @PrimaryGeneratedColumn()
  pdfId: number;

  @Column()
  sessionId: number;

  @ManyToOne(() => Session, session => session.pdfs)
  session: Session;

  @Column()
  pdfName: string;

  @Column()
  pdfLink: string;
}