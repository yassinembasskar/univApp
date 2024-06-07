import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  offerId: number;

  @Column()
  offerUnivName: string;

  @Column({ nullable: true })
  offerUnivWebsite: string;

  @Column()
  offerUnivLocation: string;

  @Column()
  offerStatus: string;

  @Column({ nullable: true })
  offerResponse: string;

  @Column()
  offerAdminEmail: string;

  @Column()
  offerAdminPassword: string;

  @Column({ nullable: true })
  offerUnivLogo: string;
}
