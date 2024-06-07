// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Req , HttpStatus, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { PostService } from './post.service';
import { UnauthorizedException } from 'src/exceptions/unauthaurised.exception';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FollowService } from './follow.service';
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}
  @Post()
  async addPost(
    @Body('userId') userIdFollowed: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const userRole = (res.req as any).session.userRole;
    const userIdFollower = (res.req as any).session.userId;
    if (!userRole && !userIdFollower) {
      throw new UnauthorizedException();
    }
    if(userIdFollowed == userIdFollower){
        throw new UnauthorizedException();
    }
    try {
      await this.followService.follow(userIdFollower, userIdFollowed);
      return res.status(HttpStatus.OK).json({ message: 'Followed Successfully' });
    } catch (error) {  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Following', error: error.message });
    }  
  }
} 