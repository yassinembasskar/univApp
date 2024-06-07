import { HttpException, HttpStatus } from '@nestjs/common';

export class InsuffisantValuesException extends HttpException {
  constructor() {
    super('Not Enough Values', HttpStatus.CONFLICT);
  }
}