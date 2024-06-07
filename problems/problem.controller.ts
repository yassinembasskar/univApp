// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Req , HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { ProblemService } from './problem.service';
@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}
} 