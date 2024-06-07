import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(entity: string) {
    super('This Entity Does Not Exist: ' + entity, HttpStatus.CONFLICT);
  }
}