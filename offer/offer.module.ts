import { Module } from '@nestjs/common';
import { JoinCommunityController } from './join_community.controller';
import { JoinCommunityService } from './join_community.service';
import { Offer } from 'src/entities/offer.entity';
import { University } from 'src/entities/university.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { OfferService } from './offer.servise';
import { OfferController } from './offer.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer, University, User]),
  ],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}