import { Module } from '@nestjs/common';
import { GptService } from './service/gpt.service.js';
import { TranslateArticlesRepository } from './repositories/tranclate.articles.repo.js';
import { ArticlesModule } from '../articles/articles.module.js';
import { GptController } from './controller/gpt.controller.js';

@Module({
  imports: [ArticlesModule],
  controllers: [GptController],
  providers: [GptService, TranslateArticlesRepository],
  exports: [GptService],
})
export class GptModule {}
