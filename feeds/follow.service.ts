// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import { User } from 'src/entities/user.entity';
import { Notification } from 'src/entities/notification.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}
  async follow(userIdFollower: number, userIdFollowed: number) {
    console.log("herewego1");
    const follower = await this.userRepository.findOne({
        where: { id: userIdFollower },
        relations: ['following']
      });
      const followed = await this.userRepository.findOne({
        where: { id: userIdFollowed },
        relations: ['followers']
      });
    
      if (!follower || !followed) {
        throw new Error('User not found');
      }
    
      if (!follower.following.some(user => user.id === followed.id)) {
        follower.following.push(followed);
      }

      if (!followed.followers.some(user => user.id === follower.id)) {
        followed.followers.push(follower);
      }
    
      // Save the updated users
      await this.userRepository.save(follower);
      await this.userRepository.save(followed);

    const notification = this.notificationRepository.create({
        notifName: `${follower.firstname} ${follower.lastname} just followed you.`,
        notifType: 'following',
        notifDate: new Date(),
        userId: followed.id,
        notifStatus: 'unread',
        notifLink: String(follower.id),
    });
    await this.notificationRepository.save(notification);
  }
}

