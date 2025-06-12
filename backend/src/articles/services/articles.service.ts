import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto.js';
import { ArticlesRepository } from '../repositories/articles.repo.js';
import { isLikelyReadableLanguage } from '../utils/article-language-filter.js';
import { rssParsers } from '../parsers/index.js';

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
    const dtos = await rssParsers.mediumFeed(mediumFeedUrl, tags);
    for (const dto of dtos) {
      const existsInDb = await this.articleRepo.findBySourceUrl(dto.sourceUrl);
      if (existsInDb) {
        console.warn(`⚠️ В базі вже є стаття з URL: ${dto.sourceUrl}`);
        continue;
      }
      const combinedText = `${dto.title} ${dto.content}`;
      if (!isLikelyReadableLanguage(combinedText)) {
        console.warn(
          `🚫 Стаття не українською/англійською: "${dto.title}","${dto.content}"`,
        );
        continue;
      }
      const fullContent = await rssParsers.mediumContent(dto.sourceUrl);
      if (fullContent) {
        dto.content = fullContent;
      }
      const regex1 = /#\w*lawyer\b/i;
      if (regex1.test(dto.title) || regex1.test(dto.content)) {
        console.warn(`🚫 Стаття містить spam hashtag: "${dto.title}"`);
        continue;
      }

      const normalizedTitle = dto.title.trim().toLowerCase();
      const normalizedContent = dto.content.trim().toLowerCase();

      const regex =
        /(member-only story|whatsapp|@gmail\.com|travitudesafaritours|safari|vacations to africa)/;

      if (regex.test(normalizedTitle) || regex.test(normalizedContent)) {
        console.warn(`🚫 Спам/платна стаття відкинута: "${dto.title}"`);
        continue;
      }
      let cleanedContent = dto.content;

      const splitMarker = 'Listen\n\nShare\n\n';
      const parts = cleanedContent.split(splitMarker);

      cleanedContent =
        parts.length > 1 ? parts[1].trim() : cleanedContent.trim();

      dto.content = cleanedContent;

      await this.create(dto);
    }
  }

  async parseAndStorePrototyprArticles(
    prototyprFeedUrl: string,
  ): Promise<void> {
    const dtos = await rssParsers.prototyprFeed(prototyprFeedUrl);
    for (const dto of dtos) {
      if (dto.content === 'undefined') {
        console.warn(`⚠️ Content is empty: ${dto.sourceUrl}`);
        continue;
      }
      const existsInDb = await this.articleRepo.findBySourceUrl(dto.sourceUrl);
      if (existsInDb) {
        console.warn(`⚠️ В базі вже є стаття з URL: ${dto.sourceUrl}`);
        continue;
      }
      const combinedText = `${dto.title} ${dto.content}`;
      if (!isLikelyReadableLanguage(combinedText)) {
        console.warn(
          `🚫 Стаття не українською/англійською: "${dto.title}","${dto.content}"`,
        );
        continue;
      }
      // const fullContent = await rssParsers.mediumContent(dto.sourceUrl);
      // if (fullContent) {
      //   dto.content = fullContent;
      // }
      const regex1 = /#\w*lawyer\b/i;
      if (regex1.test(dto.title) || regex1.test(dto.content)) {
        console.warn(`🚫 Стаття містить spam hashtag: "${dto.title}"`);
        continue;
      }

      const normalizedTitle = dto.title.trim().toLowerCase();
      const normalizedContent = dto.content.trim().toLowerCase();

      const regex =
        /(member-only story|whatsapp|@gmail\.com|travitudesafaritours|safari|vacations to africa)/;

      if (regex.test(normalizedTitle) || regex.test(normalizedContent)) {
        console.warn(`🚫 Спам/платна стаття відкинута: "${dto.title}"`);
        continue;
      }
      let cleanedContent = dto.content;

      const splitMarker = 'Listen\n\nShare\n\n';
      const parts = cleanedContent.split(splitMarker);

      cleanedContent =
        parts.length > 1 ? parts[1].trim() : cleanedContent.trim();

      dto.content = cleanedContent;
      console.log(` Знайдена нова стаття: "${dto.title}"`);
      await this.create(dto);
    }
  }

  async deleteAll() {
    return this.articleRepo.deleteAll();
  }
}
