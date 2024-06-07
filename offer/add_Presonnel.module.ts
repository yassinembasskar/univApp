import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AddPersonnelController } from './add_Personnel.controller';
import { AddPersonnelService } from './add_Personnel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AddPersonnelController],
  providers: [AddPersonnelService],
})
export class AddPersonnelModule {}