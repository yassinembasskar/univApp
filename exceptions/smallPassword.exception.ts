import { HttpException, HttpStatus } from '@nestjs/common';

export class SmallPasswordException extends HttpException {
  constructor() {
    super('Your Password is not secure', HttpStatus.CONFLICT);
  }
}