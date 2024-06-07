// src/auth/auth.controller.ts
import { Controller, Post, Body, Req, Res, HttpStatus, UnauthorizedException, UseInterceptors, UploadedFile} from '@nestjs/common';
import { JoinCommunityService } from './join_community.service';
import { Request, Response } from 'express';
import { CreateOfferDto } from 'src/dtos/createOffer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';



@Controller('join_community')
export class JoinCommunityController {
  constructor(
    private readonly offerService: JoinCommunityService,
  ) {}
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './src/offer/univ_logo',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async joinCommunity(
    @Body() createOfferDto: CreateOfferDto,
    @UploadedFile() image: Express.Multer.File,
    @Res() res: Response
  ) {
    try {
      createOfferDto.offerStatus = 'in-review';
      createOfferDto.offerUnivLogo = `./src/offer/univ_logo/${image.filename}`;
      const result = await this.offerService.addOffer(createOfferDto);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error adding offer', error: error.message });
    }
  }
}
