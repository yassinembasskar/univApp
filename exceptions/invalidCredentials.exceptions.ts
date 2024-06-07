import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCridentialsException extends HttpException {
  constructor() {
    super('Invalid Credintials', HttpStatus.CONFLICT);
  }
}