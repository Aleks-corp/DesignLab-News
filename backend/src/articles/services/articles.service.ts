import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto.js';
import { ArticlesRepository } from '../repositories/articles.repo.js';
import { parseMediumRssFeed } from '../parsers/medium.feed-parser.js';
import { isLikelyReadableLanguage } from '../utils/article-language-filter.js';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepo: ArticlesRepository) {}

  async create(dto: CreateArticleDto) {
    const article = await this.articleRepo.create(dto);
    return article;
  }

  async findAll() {
    return this.articleRepo.findAll();
  }

  async parseAndStoreMediumArticles(
    mediumFeedUrl: string,
    tags: string[],
  ): Promise<void> {
    const dtos = await parseMediumRssFeed(mediumFeedUrl, tags);
    for (const dto of dtos) {
      const combinedText = `${dto.title} ${dto.content}`;
      if (!isLikelyReadableLanguage(combinedText)) {
        console.warn(
          `🚫 Стаття не українською/англійською: "${dto.title}","${dto.content}"`,
        );
        continue;
      }
      const regex = /#\w*lawyer\b/i;
      if (regex.test(dto.title) || regex.test(dto.content)) {
        console.warn(`🚫 Стаття містить spam hashtag: "${dto.title}"`);
        continue;
      }
      await this.create(dto);
    }
  }
}
