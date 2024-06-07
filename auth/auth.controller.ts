// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Req , HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { CompleteSignupDto } from 'src/dtos/completeSignup.dto';
import { UnauthorizedException } from 'src/exceptions/unauthaurised.exception';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() loginDto: LoginUserDto, @Req() req: Request, @Res() res: Response) {
    const user = await this.authService.validateUser(loginDto);
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
    (res.req as any).session.userId = user.id;
    (res.req as any).session.userRole = user.role;
    return res.status(HttpStatus.OK).json({ message: 'Login successful'});
  }
  @Post('create_holder')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.authService.createHolder(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error registering user', error: error.message });
    }
  }
  @Post('complete_signup')
  @UseInterceptors(FileInterceptor('profile_pic', {
    storage: diskStorage({
      destination: './users/profile_pic/',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async completSignUp(@Body() completeSignUpDto: CompleteSignupDto, @UploadedFile() profile_pic: Express.Multer.File, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId || userRole =='holder') {
      throw new UnauthorizedException();
    }
    try {
      if(profile_pic){
        completeSignUpDto.profile_pic = `./src/offer/univ_logo/${profile_pic.filename}`;
      }
      const user = await this.authService.completeSignup(completeSignUpDto, userId);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error completing signup', error: error.message });
    }
  }
}