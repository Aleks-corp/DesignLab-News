import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from '../dto/create-article.dto.js';
import { Article, ArticleDocument } from '../models/article.schema.js';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name) private model: Model<ArticleDocument>,
  ) {}

  create(dto: CreateArticleDto): Promise<Article> {
    return this.model.create(dto);
  }

  findAll(): Promise<Article[]> {
    return this.model.find().exec();
  }

  async findBySourceUrl(sourceUrl: string): Promise<Article | null> {
    return this.model.findOne({ sourceUrl }).exec();
  }

  async deleteAll() {
    const result = await this.model.deleteMany({});
    return { deletedCount: result.deletedCount };
  }
}
