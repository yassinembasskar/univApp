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
@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getOffers(): Promise<OfferResponseDto[]> {
    const offers = await this.offerRepository.find();
    return offers.map(offer => new OfferResponseDto(offer));
  }

  async getProcessedOffers(): Promise<OfferResponseDto[]> {
    const offers = await this.offerRepository.find({where : {offerStatus: 'in-review'}});
    return offers.map(offer => new OfferResponseDto(offer));
  }

  async getDeniedOffers(): Promise<OfferResponseDto[]> {
    const offers = await this.offerRepository.find({where : {offerStatus: 'denied'}});
    return offers.map(offer => new OfferResponseDto(offer));
  }

  async getUniversities(): Promise<UniversityResponseDto[]> {
    const universities = await this.universityRepository.find();
    const universitiesWithAdmins = await Promise.all(universities.map(async university => {
        const admin = await this.userRepository.findOne({ where: { university, role: 'admin' } });
        return new UniversityResponseDto(university, admin);
    }));
    return universitiesWithAdmins;
  }

  async acceptOffer(offer_id: number, user_id: number): Promise<void> {
    const holder = await this.userRepository.findOne({where : {id: user_id}});
    const offer = await this.offerRepository.findOne({where : {offerId: offer_id}});
    if(!holder || holder.role!='holder'){
      throw new UnauthorizedException();
    }
    if(!offer){
      throw new EntityNotFoundException('Offer');
    }
    if(offer.offerStatus=='accepted' || offer.offerStatus=='denied'){
      throw new UnauthorizedException();
    }
    if (fs.existsSync(offer.offerUnivLogo)) {
      console.log("The logo exists:");
    } else {
      console.log("The logo does not exist");
      throw new EntityNotFoundException('Logo');
    }
    const sameEmail = await this.userRepository.findOne({where : {email: offer.offerAdminEmail}});
    const sameSecondEmail = await this.userRepository.findOne({where : {secondEmail: offer.offerAdminEmail}});  
    if(sameEmail || sameSecondEmail){
      throw new UserWithSameEmailException();
    }  
    try{
      const createUserDto = new CreateUserDto();
      const createUnivDto = new CreateUniversityDto();
      createUnivDto.univName = offer.offerUnivName;
      createUnivDto.univLocation = offer.offerUnivLocation;
      createUnivDto.univWebsite = offer.offerUnivWebsite;
      createUnivDto.univLogo = offer.offerUnivLogo;
      const newUniversity = this.universityRepository.create(createUnivDto);
      await this.universityRepository.save(newUniversity);
      createUserDto.email = offer.offerAdminEmail;
      createUserDto.password = offer.offerAdminPassword;
      createUserDto.role = 'admin';
      createUserDto.completeSignup = false;
      createUserDto.university = newUniversity;
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
      offer.offerStatus = 'accepted';
      await this.offerRepository.save(offer);
    } catch (error) {
      console.error('Error accepting offer:', error.message);
      throw new HttpException('Error accepting offer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }
  async createUniv(createUnivDto: CreateUniversityDto): Promise<University> {
    const newUniv = this.universityRepository.create(createUnivDto);
    return await this.universityRepository.save(newUniv);
  }

  async denyOffer(offer_id: number, user_id: number, offer_response: string): Promise<void> {
    const holder = await this.userRepository.findOne({where : {id: user_id}});
    const offer = await this.offerRepository.findOne({where : {offerId: offer_id}});
    if(!holder || holder.role!='holder'){
      throw new UnauthorizedException();
    }
    if(!offer){
      throw new EntityNotFoundException('Offer');
    }
    console.log(offer.offerStatus);
    if(offer.offerStatus=='accepted' || offer.offerStatus=='denied'){
      throw new UnauthorizedException();
    }
    try{ 
      offer.offerStatus = 'denied';
      offer.offerResponse = offer_response
      await this.offerRepository.save(offer);
    } catch  (error) {
      console.error('Error deneing offer:', error.message);
      throw new HttpException('Error deneing offer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
  
}

