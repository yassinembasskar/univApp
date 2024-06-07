// src/auth/auth.controller.ts
import { Controller, Post, Body, Req, Res, HttpStatus, UnauthorizedException, Get, Injectable} from '@nestjs/common';
import { Request, Response } from 'express';
import { OfferResponseDto } from 'src/dtos/offerResponse.dto';
import { OfferService } from './offer.servise';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { University } from 'src/entities/university.entity';
import { UniversityResponseDto } from 'src/dtos/univResponse.dto';



@Controller('offers')
export class OfferController {
  constructor(
    private readonly offerService: OfferService,
  ) {}

  @Get('all')
  async getOffers(@Res() res: Response) {
    try {
        const offers: OfferResponseDto[] = await this.offerService.getOffers();
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', offers });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
      }
  }

  @Get('in-review')
  async getProcessedOffers(@Res() res: Response) {
    try {
        const offers: OfferResponseDto[] = await this.offerService.getProcessedOffers();
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', offers });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
      }
  }

  @Get('denied')
  async getDeniedOffers(@Res() res: Response) {
    try {
        const offers: OfferResponseDto[] = await this.offerService.getDeniedOffers();
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', offers });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
      }
  }

  @Get('Universities')
  async getUniversities(@Res() res: Response) {
    try {
        const offers: UniversityResponseDto[] = await this.offerService.getUniversities();
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', offers });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
      }
  }


  @Post('accept')
  async acceptOffer (@Body('offer_id') offer_id:number, @Req() req: Request, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId || userRole!='holder') {
      throw new UnauthorizedException();
    }
    try{
      await this.offerService.acceptOffer(offer_id,userId);
      return res.status(HttpStatus.OK).json({ message: 'Offer accepted successfully' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error accepting offer', error: error.message });
    }
  }

  @Post('deny')
  async denyOffer (@Body('offer_id') offer_id:number, @Body('offer_response') offer_response: string, @Req() req: Request, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId || userRole!='holder') {
      throw new UnauthorizedException();
    }
    try{
      await this.offerService.denyOffer(offer_id,userId,offer_response);
      return res.status(HttpStatus.OK).json({ message: 'Offer denied successfully' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error deniying offer', error: error.message });
    }
  }
}
