import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticlesService } from '../services/articles.service.js';
import { CreateArticleDto } from '../dto/create-article.dto.js';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('parse-medium')
  async triggerMediumParse() {
    const mediumFeedUrl = 'https://medium.com/feed/tag/';
    const tags = ['ux', 'ux-design', 'uxui-design'];
    await this.articlesService.parseAndStoreMediumArticles(mediumFeedUrl, tags);
    return { status: 'ok' };
  }
}
