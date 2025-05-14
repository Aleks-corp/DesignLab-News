import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Article,
  ArticleDocument,
} from '../../articles/models/article.schema.js';

@Injectable()
export class TranslateArticlesRepository {
  constructor(
    @InjectModel(Article.name) private model: Model<ArticleDocument>,
  ) {}

  async findManyByStatus(status: string): Promise<ArticleDocument[]> {
    return this.model.find({ status }).exec();
  }

  async update(
    id: string,
    dto: Partial<Article>,
  ): Promise<ArticleDocument | null> {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
