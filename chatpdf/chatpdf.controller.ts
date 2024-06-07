// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Req , HttpStatus, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response, Request } from 'express';
import { ChatpdfService } from './chatpdf.service';
import { SessionResponseDto } from 'src/dtos/sessionResponse.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UnauthorizedException } from 'src/exceptions/unauthaurised.exception';
import { PdfResponseDto } from 'src/dtos/pdfResponse.dto';

@Controller('chatpdf') 
export class ChatpdfController {
  constructor(private readonly chatpdfService: ChatpdfService) {}
  @Get('sessions')
  async getSessions(@Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId) {
      throw new UnauthorizedException();
    }
    try {
        const sessions: SessionResponseDto[] = await this.chatpdfService.getSessions(userId);
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', sessions });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
      }
  }

  @Get('pdfs')
  async getPdfs(@Body('session_id') sessionId: number, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId) {
      throw new UnauthorizedException();
    }
    try {
        const pdfs: PdfResponseDto[] = await this.chatpdfService.getPdfs(sessionId,userId);
        return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', pdfs });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
      }
  }

  @Post('create_session')
  async createSession(@Body('sessionName') sessionName: string, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId || userRole!='professor') {
      throw new UnauthorizedException();
    }
    try {
      const session = await this.chatpdfService.createSession(userId, sessionName);
      return res.status(HttpStatus.OK).json({ message: 'session created successfully', session });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error creating session', error: error.message });
    }
  }


  @Post('uploadPdf')
  @UseInterceptors(FileInterceptor('pdfFile', {
    storage: diskStorage({
      destination: './pdf_files/',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `pdf-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async uploadPdf(@UploadedFile() pdfFile: Express.Multer.File, @Body() pdfName: string, @Body() sessionId: number, @Res() res: Response) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId || userRole!='admin') {
      throw new UnauthorizedException();
    }
    try {
      const session = await this.chatpdfService.uploadPdf(pdfFile, pdfName, sessionId);
      return res.status(HttpStatus.OK).json({ message: 'Offers these are the lists of the offers', session });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error listing offers', error: error.message });
    }
  }
}