import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayementController } from './payement.controller';
import { PayementService } from './payement.service';
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PayementController],
  providers: [PayementService],
})
export class PayementModule {}   