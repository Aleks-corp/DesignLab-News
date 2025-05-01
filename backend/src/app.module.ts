import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module.js';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    ArticlesModule,
  ],
})
export class AppModule {}
