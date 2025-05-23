import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ArticlesService } from '../services/articles.service.js';
import { CreateArticleDto } from '../dto/create-article.dto.js';
import { Response } from 'express';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto);
  }

  @Get('')
  async findAll(@Res() res: Response) {
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
      <body>
        <h1>Список статей</h1>
        ${articles
          .map(
            (article) => `
          <div style="border-bottom:1px solid #ccc; margin-bottom:20px;">
            <h2><a href="${article.sourceUrl}" target="_blank">${article.title}</a></h2>
            ${article.imageUrl ? `<img src="${article.imageUrl}" style="max-width:100%;">` : ''}
            <p>${article.content}</p>
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
  }

  @Get('parse-medium')
  async triggerMediumParse() {
    const mediumFeedUrl = 'https://medium.com/feed/tag/';
    const tags = ['ux', 'ux-design', 'uxui-design'];
    await this.articlesService.parseAndStoreMediumArticles(mediumFeedUrl, tags);
    return this.articlesService.findAll();
  }

  @Get('delete')
  deleteAll() {
    return this.articlesService.deleteAll();
  }
}
