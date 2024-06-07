import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { Offer } from 'src/entities/offer.entity';
import { University } from 'src/entities/university.entity';
import { User } from 'src/entities/user.entity';
import { OfferResponseDto } from 'src/dtos/offerResponse.dto';
import { UnauthorizedException } from 'src/exceptions/unauthaurised.exception';
import { EntityNotFoundException } from 'src/exceptions/notFoundEntity.exception';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { CreateUniversityDto } from 'src/dtos/createUniv.dto';
import { UniversityResponseDto } from 'src/dtos/univResponse.dto';
import { UserWithSameEmailException } from 'src/exceptions/userSameEmail.exception';
import { PostResponseDto } from 'src/dtos/postResponse.dto';
import { PostController } from 'src/feeds/post.controller';
import { Post } from 'src/entities/post.entity';
import { UserResponseDto } from 'src/dtos/userResponse.dto';
import { RepostResponseDto } from 'src/dtos/repostResponse.dto';
import { Repost } from 'src/entities/repost.entity';
import { actionAlreadyDoneException } from 'src/exceptions/actionAlreadyDone.exception';
import { Spam } from 'src/entities/spam.entity';
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Repost)
    private readonly repostRepository: Repository<Repost>,
    @InjectRepository(Spam)
    private readonly spamRepository: Repository<Spam>,
  ) {}

  async getFollowers(userId: number): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({});
    return users.map(user => new UserResponseDto(user));
  }

  async getFollowing(userId: number): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map(user => new UserResponseDto(user));
  }

  async getPosts(userId: number, viewerId: number): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.find({where : {userId}});
    return posts.map(post => new PostResponseDto(post));
  }

  async getReposts(userId: number, viewerId: number): Promise<RepostResponseDto[]> {
    const reposts = await this.repostRepository.find({where : {userId}});
    return reposts.map(repost => new RepostResponseDto(repost));
  }

  async reportUser(spamContent: string, userId: number, viewerId: number): Promise<void> {
    const viewer = await this.userRepository.findOne({where: { id: viewerId }});
    const user = await this.userRepository.findOne({where: { id: userId }});
    const spam = await this.spamRepository.findOne({ where: { reporterId: userId, reportedId: viewerId}});
    if(spam){
      throw new actionAlreadyDoneException();
    }
    const newSpam = this.spamRepository.create({
      spamContent: spamContent,
      spamType: 'user',
      spamDate: new Date(),
      reportedBy: user,
      reportedId: userId,
      reporter: viewer,
      reporterId: viewerId,
    });
    await this.spamRepository.save(newSpam);
  }
}

