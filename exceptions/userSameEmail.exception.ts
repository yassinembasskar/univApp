import { HttpException, HttpStatus } from '@nestjs/common';

export class UserWithSameEmailException extends HttpException {
  constructor() {
    super('A User With Same Email Already Exist', HttpStatus.CONFLICT);
  }
}