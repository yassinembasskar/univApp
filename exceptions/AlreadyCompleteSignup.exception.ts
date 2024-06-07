import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyCompletedSignup extends HttpException {
  constructor() {
    super('Already Completed SignUp', HttpStatus.CONFLICT);
  }
}