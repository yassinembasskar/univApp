import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from 'src/entities/post.entity';
import { Notification } from 'src/entities/notification.entity';
import { User } from 'src/entities/user.entity';
import { Image } from 'src/entities/image.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
@Module({
  imports: [TypeOrmModule.forFeature([Notification, User])],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}   