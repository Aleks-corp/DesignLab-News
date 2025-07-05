import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ArticlesService } from '../services/articles.service.js';
import { CreateArticleDto } from '../dto/create-article.dto.js';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { SimpleAuthGuard } from '../../auth/simple-auth.guard.js';
import { Article } from '../models/article.schema.js';
import mongoose from 'mongoose';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(SimpleAuthGuard)
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto);
  }

  @Get('')
  @UseGuards(SimpleAuthGuard)
  async findAllArr() {
    const articles = await this.articlesService.findAll();
    return { totalHits: articles.length, articles };
  }

  @Get('published')
  async findAllPublished(
    @Query('page') page = 1,
    @Query('limit') limit = 9,
    @Query('search') search = '',
  ) {
    const { articles, totalHits } =
      await this.articlesService.findPublishedPaginated(
        Number(page),
        Number(limit),
        search,
      );
    return { totalHits, articles };
  }

  @Get('pending')
  @UseGuards(SimpleAuthGuard)
  async findAllPending() {
    const articles = await this.articlesService.findPending();
    return { totalHits: articles.length, articles };
  }

  @Patch('confirm')
  @UseGuards(SimpleAuthGuard)
  async confirm(@Body() article: Partial<Article> & { _id: string }) {
    return this.articlesService.confirm(article);
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid article id');
    }
    const article = await this.articlesService.findById(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  @Delete('delete')
  @UseGuards(SimpleAuthGuard)
  deleteAll() {
    return this.articlesService.deleteAll();
  }

  @Delete(':id')
  @UseGuards(SimpleAuthGuard)
  async deleteById(@Param('id') id: string) {
    const deleted = await this.articlesService.deleteById(id);
    if (!deleted) throw new NotFoundException('Article not found');
    return { success: true };
  }

  @Get('html')
  @UseGuards(SimpleAuthGuard)
  async findAll(@Res() res: Response) {
    try {
      const articles = await this.articlesService.findAll();

      const html = `
      <!DOCTYPE html>
  <html lang="uk">
  <head>
    <meta charset="UTF-8">
    <title>Статті</title>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: auto; padding: 20px; }
      .article { border-bottom: 1px solid #ddd; margin-bottom: 30px; padding-bottom: 20px; }
      .article img { max-width: 100%; height: auto; }
      .categories { font-size: 0.9em; color: #555; }
      .author { font-size: 0.9em; color: #777; }
      .published { font-size: 0.9em; color: #999; }
    </style>
  </head>
        <body style="max-width:1024px">
          <h1>Список статей</h1>
          ${articles
            .map(
              (article, index) => `
            <div style="border-bottom:1px solid #ccc; margin-bottom:20px;">
              <h2 style="font-size:36px; font-weight:600; text-align:center;">${index + 1}) ${article.title}</h2>
              <div style="font-size:16px">${article.content}</div>
              <p>Категорії: ${article.categories ? article.categories.join(', ') : ''}</p>
              <p>Автор: ${article.author}</p>
              <p>Опубліковано: ${new Date(article.publishedAt ? article.publishedAt : '').toLocaleString()}</p>
              <p><a href="${article.sourceUrl}" target="_blank">Читати оригінал</a></p>
            </div>
          `,
            )
            .join('')}
        </body>
      </html>
    `;
      res.send(html);
    } catch (err) {
      console.log(' ArticlesControllererr:', err);
      res.status(500).send('Внутрішня помилка сервера');
    }
  }

  @Get('parse-medium')
  @UseGuards(SimpleAuthGuard)
  async triggerMediumParse() {
    const mediumFeedUrl = 'https://medium.com/feed/tag/';
    const tags = ['ux', 'ux-design', 'uxui-design'];
    await this.articlesService.parseAndStoreMediumArticles(mediumFeedUrl, tags);
    return this.articlesService.findAll();
  }

  @Get('parse-prototypr')
  @UseGuards(SimpleAuthGuard)
  async triggerPrototyprParse() {
    const prototyprFeedUrl = 'https://blog.prototypr.io/feed/';

    await this.articlesService.parseAndStorePrototyprArticles(prototyprFeedUrl);
    return this.articlesService.findAll();
  }

  @Get('parse-smashing')
  @UseGuards(SimpleAuthGuard)
  async triggerSmashingParse() {
    const smashingFeedUrl = 'https://www.smashingmagazine.com/feed/';

    await this.articlesService.parseAndStoreSmashingArticles(smashingFeedUrl);
    return this.articlesService.findAll();
  }

  @Get('parse-articles')
  @UseGuards(SimpleAuthGuard)
  async triggerParse() {
    const prototyprFeedUrl = 'https://blog.prototypr.io/feed/';
    const smashingFeedUrl = 'https://www.smashingmagazine.com/feed/';

    return await this.articlesService.parseAndStoreArticles(
      prototyprFeedUrl,
      smashingFeedUrl,
    );
  }
}
