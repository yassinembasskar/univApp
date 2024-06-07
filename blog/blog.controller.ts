// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Req , HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  
}