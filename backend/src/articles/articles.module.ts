import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesController } from './controllers/articles.controller.js';
import { ArticlesService } from './services/articles.service.js';
import { ArticlesRepository } from './repositories/articles.repo.js';
import { Article, ArticleSchema } from './models/article.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
  exports: [ArticlesService, MongooseModule],
})
export class ArticlesModule {}
