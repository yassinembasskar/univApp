import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateOfferDto } from 'src/dtos/createOffer.dto';
import { Offer } from 'src/entities/offer.entity';
import { EntityNotFoundException } from 'src/exceptions/notFoundEntity.exception';
import { SmallPasswordException } from 'src/exceptions/smallPassword.exception';
@Injectable()
export class JoinCommunityService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}


  async addOffer(offerDto: CreateOfferDto): Promise<any> {
    const { offerAdminPassword, ...otherFields } = offerDto;

    let hashedPassword;
    if(offerAdminPassword.length<8){
      throw new SmallPasswordException();
  }
    if (offerAdminPassword) {
      hashedPassword = await bcrypt.hash(offerAdminPassword, 10);
    } else {
      throw new EntityNotFoundException('Password');
    }

    const newOffer = this.offerRepository.create({
      ...otherFields,
      offerAdminPassword: hashedPassword,
    });

    return await this.offerRepository.save(newOffer);
  }
  
}

