import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JoinCommunityModule } from './offer/join_community.module';
import { ProblemModule } from './problems/problem.module';
import { PayementModule } from './payement/payement.module';
import { ChatpdfModule } from './chatpdf/chatpdf.module';
import { BlogModule } from './blog/blog.module';
import { PostModule } from './feeds/post.module';
import { OfferModule } from './offer/offer.module';
import { AddPersonnelModule } from './offer/add_Presonnel.module';
import { FollowModule } from './feeds/follow.module';
@Module({
  imports: [AuthModule, AddPersonnelModule, JoinCommunityModule, ProblemModule, PostModule, PayementModule, ChatpdfModule, OfferModule, BlogModule, FollowModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'YASSINE',
      database: 'stagedb',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
    
