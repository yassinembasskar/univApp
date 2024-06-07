import { User } from 'src/entities/user.entity';
import { UniversityResponseDto } from './univResponse.dto';
import { University } from 'src/entities/university.entity';


export class UserResponseDto {
  id: number;
  login: string;
  email: string;
  secondEmail: string | null;
  firstname: string;
  lastname: string;
  role: string;
  profilePic: string | null;
  profileBio: string | null;
  title: string;
  completeSignup: boolean;
  university: UniversityResponseDto;
  univId: number;
  constructor (user: User){
    this.id = user.id;
    this.login = user.login;
    this.email = user.email;
    this.secondEmail = user.secondEmail;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.role = user.role;
    this.profilePic = user.profilePic;
    this.profileBio = user.profileBio;
    this.title = user.title;
    this.completeSignup = user.completeSignup;
    this.univId = user.univId;
  }
}
