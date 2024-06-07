import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEntityException extends HttpException {
  constructor() {
    super('Invalid Entity', HttpStatus.CONFLICT);
  }
}