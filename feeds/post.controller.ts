// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Req , HttpStatus, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { PostService } from './post.service';
import { UnauthorizedException } from 'src/exceptions/unauthaurised.exception';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('feeds')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('add_post')
  @UseInterceptors(FilesInterceptor('images', 10))
  async addPost(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body('content') content: string,
    @Body('post_visibility') post_visibility: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId) {
      throw new UnauthorizedException();
    }
    try {
      // Assuming addPost can take the images array directly
      await this.postService.addPost(images, content, post_visibility, userId);
      return res.status(HttpStatus.OK).json({ message: 'Post added successfully' });
    } catch (error) {  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error adding post', error: error.message });
    }  
  }
  @Post('add_comment')
  async addComment(
    @Body('content') content: string,
    @Body('postId') postId: number,
    @Res() res: Response
  ) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId) {
      throw new UnauthorizedException();
    }
    try {
      await this.postService.addComment(content, postId, userId);
      return res.status(HttpStatus.OK).json({ message: 'Comment added successfully' });
    } catch (error) {  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error adding Comment', error: error.message });
    }  
  }
  @Post('save_post')
  async savePost(
    @Body('postId') postId: number,
    @Res() res: Response
  ){
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId) {
      throw new UnauthorizedException();
    }
    try {
      await this.postService.savePost(userId, postId);
      return res.status(HttpStatus.OK).json({ message: 'Post Saved successfully' });
    } catch (error) {  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error saving the post', error: error.message });
    }  
  }

  @Post('repost')
  async repost(
    @Body('postId') postId: number,
    @Body('content') content: string,
    @Res() res: Response
  ){
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId) {
      throw new UnauthorizedException();
    }
    try {
      await this.postService.repost(content, userId, postId);
      return res.status(HttpStatus.OK).json({ message: 'Post reposted successfully' });
    } catch (error) {  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error reposting', error: error.message });
    }  
  }

  @Post('react')
  async react(
    @Body('postId') postId: number,
    @Body('react_type') reactType: string,
    @Res() res: Response
  ){
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId) {
      throw new UnauthorizedException();
    }
    try {
      await this.postService.react(reactType, postId, userId);
      return res.status(HttpStatus.OK).json({ message: 'Reacted successfully' });
    } catch (error) {  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error reacting', error: error.message });
    }  
  }

  @Post('check_react')
  async checkReact(
    @Body('postId') postId: number,
    @Res() res: Response
  ){
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId) {
      throw new UnauthorizedException();
    }
    try {
      const react = await this.postService.checkReact(userId, postId);
      return react;
    } catch (error) {  
      throw new Error('Error reacting' + error);
    }  
  }

  @Post('report_post')
  async reportPost(
    @Body('postId') postId: number,
    @Body('justification') spamContent: string,
    @Res() res: Response
  ){
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId) {
      throw new UnauthorizedException();
    }
    try {
      await this.postService.reportPost(userId, postId, spamContent);
      return res.status(HttpStatus.OK).json({ message: 'Reported successfully' });
    } catch (error) {  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error reacting', error: error.message });
    }  
  }
} 