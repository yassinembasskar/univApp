import { Module } from '@nestjs/common';
import { ChatpdfController } from './chatpdf.controller';
import { ChatpdfService } from './chatpdf.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/entities/session.entity';
import { PDF } from 'src/entities/pdf.entity';
import { User } from 'src/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Session, PDF, User])],
  controllers: [ChatpdfController],
  providers: [ChatpdfService],
})
export class ChatpdfModule {}