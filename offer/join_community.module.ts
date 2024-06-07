import { Module } from '@nestjs/common';
import { JoinCommunityController } from './join_community.controller';
import { JoinCommunityService } from './join_community.service';
import { Offer } from 'src/entities/offer.entity';
import { University } from 'src/entities/university.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer, University, User]),
  ],
  controllers: [JoinCommunityController],
  providers: [JoinCommunityService],
})
export class JoinCommunityModule {}