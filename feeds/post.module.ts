import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from 'src/entities/post.entity';
import { Notification } from 'src/entities/notification.entity';
import { User } from 'src/entities/user.entity';
import { Image } from 'src/entities/image.entity';
import { Save } from 'src/entities/save.entity';
import { Repost } from 'src/entities/repost.entity';
import { Comment } from 'src/entities/comment.entity';
import { React } from 'src/entities/react.entity';
import { Spam } from 'src/entities/spam.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Post, Notification, User, Image, Save, Repost, Comment, React, Spam])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}   