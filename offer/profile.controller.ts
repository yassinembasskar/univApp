// src/auth/auth.controller.ts
import { Controller, Post, Body, Req, Res, HttpStatus, UnauthorizedException, Get, Injectable} from '@nestjs/common';
import { Request, Response } from 'express';
import { OfferResponseDto } from 'src/dtos/offerResponse.dto';
import { UniversityResponseDto } from 'src/dtos/univResponse.dto';
import { ProfileService } from './profile.service';
import { PostResponseDto } from 'src/dtos/postResponse.dto';
import { RepostResponseDto } from 'src/dtos/repostResponse.dto';
import { UserResponseDto } from 'src/dtos/userResponse.dto';



@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Get('posts')
  async getPosts(@Body("id") userId: number, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const viewerId = (res.req as any).session.userId;
    if (!userRole && !viewerId) {
      throw new UnauthorizedException();
    }
    try {
        const posts: PostResponseDto[] = await this.profileService.getPosts(userId, viewerId);
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', posts });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
      }
  }

  @Get('reposts')
  async getReposts(@Body("id") userId: number, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const viewerId = (res.req as any).session.userId;
    if (!userRole && !viewerId) {
      throw new UnauthorizedException();
    }
    try {
        const reposts: RepostResponseDto[] = await this.profileService.getReposts(userId,viewerId);
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', reposts });
    } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
    }
  }

  @Get('followers')
  async getFollowers(@Body("id") userId: number, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const viewerId = (res.req as any).session.userId;
    if (!userRole && !viewerId) {
        throw new UnauthorizedException();
      }
    try {
        const users: UserResponseDto[] = await this.profileService.getFollowers(userId);
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', users });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
      }
  }

  @Get('following')
  async getFollowing(@Body("id") userId: number, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const viewerId = (res.req as any).session.userId;
    if (!userRole && !viewerId) {
      throw new UnauthorizedException();
    }
    try {
        const users: UserResponseDto[] = await this.profileService.getFollowing(userId);
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', users });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
      }
  }

  @Post('report_user')
  async reportUser(
    @Body('id') userId: number,
    @Body('justification') spamContent: string,
    @Res() res: Response
  ){
    const userRole = (res.req as any).session.userRole;
    const viewerId = (res.req as any).session.userId;
    if (!userRole && !viewerId) {
      throw new UnauthorizedException();
    }
    try {
      await this.profileService.reportUser(spamContent, userId, viewerId);
      return res.status(HttpStatus.OK).json({ message: 'Reported successfully' });
    } catch (error) {  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error reacting', error: error.message });
    }  
  }
}
