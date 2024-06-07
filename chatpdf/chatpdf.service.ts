// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SessionResponseDto } from 'src/dtos/sessionResponse.dto';
import { Session } from 'src/entities/session.entity';
import { PDF } from 'src/entities/pdf.entity';
import { PdfResponseDto } from 'src/dtos/pdfResponse.dto';
import { User } from 'src/entities/user.entity';
import { UnauthorizedException } from 'src/exceptions/unauthaurised.exception';

@Injectable()
export class ChatpdfService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(PDF)
    private readonly pdfRepository: Repository<PDF>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getSessions(userId: number): Promise<any> {
    try {
      const user = await this.userRepository.findOne({where: {id: userId}});
      if (!user) {
        throw new Error('User not found');
      }
      const univId = user.university.univId;
      const usersWithSameUnivId = await this.userRepository.find({ where: { univId } });
      const sessions = await this.sessionRepository.find({ where: { user: usersWithSameUnivId } });
      return sessions.map(session => new SessionResponseDto(session));
    } catch (error) {
      throw new Error('Error fetching sessions: ' + error.message);
    }
  }

  async getPdfs(sessionId: number, userId: number): Promise<any> {
    try {
      const user = await this.userRepository.findOne({where: {id: userId}});
      const session = await this.sessionRepository.findOne({where: {sessionId}});
      const sessionCreator = session.user;
      if (!user || !sessionCreator) {
        throw new Error('User not found');
      }
      if(user.university!=sessionCreator.university){
        throw new UnauthorizedException();
      }
      const pdfs = await this.pdfRepository.find({ where: { sessionId } });
      return pdfs.map(pdf => new PdfResponseDto(pdf));
    } catch (error) {
      throw new Error('Error fetching PDFS: ' + error.message);
    }
  }

  async createSession(userId: number,sessionName: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException();
    }
    const userSessions = await this.sessionRepository.find({ where: { user } });
    if (userSessions.length >= 2 && user.role !== 'professor') {
      throw new UnauthorizedException();
    }
    const newSession = await this.sessionRepository.create({
      user, 
      sessionName, 
      sessionDate: new Date(),
    });
    await this.sessionRepository.save(newSession);
    return newSession;
  }

  async uploadPdf(pdfFile: Express.Multer.File, pdfName: string, sessionId: number): Promise<any> {
    try {
      const session = await this.sessionRepository.findOne({ where: { sessionId } });
      if (!session) {
        throw new Error('Session not found');
      }
      const newPDF = await this.pdfRepository.create({
        session,
        sessionId, 
        pdfName, 
      });
      await this.pdfRepository.save(newPDF);
      return newPDF;
    } catch (error) {
      await unlinkAsync(pdfFile.path);
      throw error;
    }
  }
}
function unlinkAsync(path: string) {
  throw new Error('Function not implemented.');
} 



