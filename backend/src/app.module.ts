import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module.js';
import 'dotenv/config';
import { GptModule } from './gpt/gpt.module.js';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    ArticlesModule,
    GptModule,
  ],
})
export class AppModule {}
