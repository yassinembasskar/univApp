import { HttpException, HttpStatus } from '@nestjs/common';

export class actionAlreadyDoneException extends HttpException {
  constructor() {
    super('This Action is already done', HttpStatus.CONFLICT);
  }
}