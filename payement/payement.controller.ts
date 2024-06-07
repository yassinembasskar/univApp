// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Req , HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { PayementService } from './payement.service';
@Controller('payement')
export class PayementController {
  constructor(private readonly payementService: PayementService) {}
} 