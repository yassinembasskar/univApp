import { HttpException, HttpStatus } from '@nestjs/common';

export class UserWithSameLoginException extends HttpException {
  constructor() {
    super('User with the same login already exists.', HttpStatus.CONFLICT);
  }
}