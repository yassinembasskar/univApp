import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { InvalidEntityException } from 'src/exceptions/invalidEntity.exception';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UnauthorizedException } from 'src/exceptions/unauthaurised.exception';
import { UserWithSameEmailException } from 'src/exceptions/userSameEmail.exception';
import { InsuffisantValuesException } from 'src/exceptions/insuffisantValues.exception';
import { SmallPasswordException } from 'src/exceptions/smallPassword.exception';

const execPromise = promisify(exec);
@Injectable()
export class AddPersonnelService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async addStudentsFile(excelFile: Express.Multer.File, userId: number, role: string): Promise<any> {
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExtension = path.extname(excelFile.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new InvalidEntityException();
    }
    const filePath = path.resolve(excelFile.path);
    const pythonScriptPath = path.resolve('./src/python_scripts/add_students.py');
    try {
      const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${filePath}`);
       
      if (stderr) {
        throw new Error(stderr);
      }
      const result = JSON.parse(stdout);
      result.forEach(entry => {
        this.processEmailAndPasswordStd(entry.email, entry.password, userId, role);
      });

    } catch (error) {
      throw new Error(`Error processing Excel file: ${error.message}`);
    } finally {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${err}`);
        }
      });
    }
  }
  async processEmailAndPasswordStd(email: string, password: string, userId: number, role: string): Promise<void> {
    const admin = await this.userRepository.findOne({where : {id: userId}});
    if(!admin || admin.role!='admin'){
        throw new UnauthorizedException();
    }
    if(password.length<8){
        throw new SmallPasswordException();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const sameEmail = await this.userRepository.findOne({where : {email}});
    const sameSecondEmail = await this.userRepository.findOne({where : {secondEmail: email}});  
    if(sameEmail || sameSecondEmail){
      throw new UserWithSameEmailException();
    }
    const createUserDto = new CreateUserDto();
    createUserDto.email = email;
    createUserDto.password = hashedPassword;
    createUserDto.role = role;
    createUserDto.completeSignup = false;
    createUserDto.university = admin.university;
    await this.userRepository.save(createUserDto);
  }
}

