import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [ProblemController],
  providers: [ProblemService],
})
export class ProblemModule {}   