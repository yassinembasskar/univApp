import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Post } from 'src/entities/post.entity';
import { Repost } from 'src/entities/repost.entity';
import { Spam } from 'src/entities/spam.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Post,Repost,Spam]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}