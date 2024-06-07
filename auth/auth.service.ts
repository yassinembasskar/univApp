import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UserWithSameLoginException } from 'src/exceptions/userSameLogin.exception';
import { SmallPasswordException } from 'src/exceptions/smallPassword.exception';
import { UserWithSameEmailException } from 'src/exceptions/userSameEmail.exception';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { CompleteSignupDto } from 'src/dtos/completeSignup.dto';
import { InsuffisantValuesException } from 'src/exceptions/insuffisantValues.exception';
import { UnauthorizedException } from 'src/exceptions/unauthaurised.exception';
import { AlreadyCompletedSignup } from 'src/exceptions/AlreadyCompleteSignup.exception';
import { InvalidCridentialsException } from 'src/exceptions/invalidCredentials.exceptions';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { login, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: [{ login: login }, { email: login }],
    });
    if (!user) {
      throw new InvalidCridentialsException();
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCridentialsException();  
    }

    return user;
  }

  async createHolder(userData: CreateUserDto): Promise<User | null> {
    try {
      let userWithSameLogin = await this.userRepository.findOne({ where: { login : userData.login } });

      if (userWithSameLogin) {
        throw new UserWithSameLoginException();
      }

      const userWithEmail = await this.userRepository.findOne({ where: { email : userData.email } });
      const userWithSecondEmail = await this.userRepository.findOne({ where: { secondEmail : userData.email } });
      if (userWithEmail || userWithSecondEmail) {
        throw new UserWithSameEmailException();
      }
      if (userData.password.length < 8) {
        throw new SmallPasswordException();
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
        completeSignup: true,
        role: "holder",
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async completeSignup(completeSignUpDto: CompleteSignupDto, userId: number): Promise<User> {
    const { login, second_email, firstname, lastname, title } = completeSignUpDto;
    const user = await this.userRepository.findOne({ where: [{ id: userId }] });
    if (!user) {
      throw new UnauthorizedException();
    }
    if(user.completeSignup){
      throw new AlreadyCompletedSignup();
    }
    if(!login || !firstname || !lastname || !title){
      throw new InsuffisantValuesException();
    }
    const userSameLogin = await this.userRepository.findOne({ where: [{ login }] });
    if (userSameLogin){
      throw new UserWithSameLoginException();
    }
    if(second_email){
      const userWithEmail = await this.userRepository.findOne({ where: { email : second_email } });
      const userWithSecondEmail = await this.userRepository.findOne({ where: { secondEmail : second_email } });
      if (userWithEmail || userWithSecondEmail) {
        throw new UserWithSameEmailException();
      }
      user.secondEmail = second_email;
    }
    if(completeSignUpDto.profile_pic){
      user.profilePic = completeSignUpDto.profile_pic;
    }
    if(completeSignUpDto.profile_bio){
      user.profileBio = completeSignUpDto.profile_bio;
    }
    user.login = login;
    user.firstname = firstname;
    user.lastname = lastname;
    user.title = title;
    user.completeSignup = true;
    return await this.userRepository.save(user);
  }
}

