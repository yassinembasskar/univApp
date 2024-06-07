import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super('You are not authorised to do this action', HttpStatus.CONFLICT);
  }
}