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

  findById(id: string) {
    return this.model.findById(id).exec();
  }

  update(id: string, updateData: Partial<Article>) {
    return this.model.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  async findBySourceUrl(sourceUrl: string): Promise<Article | null> {
    return this.model.findOne({ sourceUrl }).exec();
  }

  findApproved(): Promise<Article[]> {
    return this.model
      .find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .exec();
  }

  findPending(): Promise<Article[]> {
    return this.model
      .find({ status: 'underreview' })
      .sort({ createdAt: -1 })
      .exec();
  }

  async deleteAll() {
    const result = await this.model.deleteMany({});
    return { deletedCount: result.deletedCount };
  }

  async deleteById(id: string) {
    await this.model.deleteOne({ _id: id });
    return { message: 'Delete successful' };
  }

  // async insertMany(articles: Article[]): Promise<Article[]> {
  //   return this.model.insertMany(articles);
  // }
}
