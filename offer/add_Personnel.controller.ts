// src/auth/auth.controller.ts
import { Controller, Post, Body, Req, Res, HttpStatus, UnauthorizedException, UseInterceptors, UploadedFile} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateOfferDto } from 'src/dtos/createOffer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddPersonnelService } from './add_Personnel.service';



@Controller('personnel')
export class AddPersonnelController {
  constructor(
    private readonly personnelService: AddPersonnelService,
  ) {}
  @Post('add_students_file')
  @UseInterceptors(FileInterceptor('excelFile', {
    storage: diskStorage({
      destination: './excel_files/',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `excel-${uniqueSuffix}${ext}`);
      }
    })
  }))   
  async AddStudentsFile(
    @UploadedFile() excelFile: Express.Multer.File,
    @Res() res: Response
  ) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId || userRole!='admin') {
      throw new UnauthorizedException();
    }
    try { 
      const result = await this.personnelService.addStudentsFile(excelFile,userId, 'student');
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error adding students', error: error.message });
    }
  }
  @Post('add_professors_file')
  @UseInterceptors(FileInterceptor('excelFile', {
    storage: diskStorage({
      destination: './excel_files/',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `excel-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async AddProfessors(
    @UploadedFile() excelFile: Express.Multer.File,
    @Res() res: Response
  ) {
    const userRole = (res.req as any).session.userRole;
    const userId = (res.req as any).session.userId;
    if (!userRole && !userId || userRole!='admin') {
      throw new UnauthorizedException();
    }
    try { 
      const result = await this.personnelService.addStudentsFile(excelFile,userId,'professor');
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error adding professors', error: error.message });
    }
  }
}
