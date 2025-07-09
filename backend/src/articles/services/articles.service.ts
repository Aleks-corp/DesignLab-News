import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto.js';
import { ArticlesRepository } from '../repositories/articles.repo.js';
import { isLikelyReadableLanguage } from '../utils/article-language-filter.js';
import { rssParsers } from '../parsers/index.js';
import { articlesAddFilter } from '../utils/articles.clean.js';
import { articlesDayCount } from '../utils/articlesDayCount.js';
import { Article } from '../models/article.schema.js';
import { extractExcerptFromContent } from '../utils/article-excerpt-translate.js';

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

  async findById(id: string) {
    return this.articleRepo.findById(id);
  }

  async approveArticle(article: Partial<Article> & { _id: string }) {
    const { _id, content, ...rest } = article;
    const OldArticle = await this.articleRepo.findById(_id);
    if (!OldArticle) {
      throw new NotFoundException(`Статтю з ID ${_id} не знайдено`);
    }
    const newExcerpt = extractExcerptFromContent(content || '');
    const excerptToSave =
      newExcerpt.trim() !== '' ? newExcerpt : article.excerpt || '';
    const updated = await this.articleRepo.updateById(_id, {
      ...rest,
      content,
      excerpt: excerptToSave,
      status: 'approved',
    });

    if (!updated) throw new NotFoundException('Article not found');
    return updated;
  }

  async deleteAll() {
    return this.articleRepo.deleteAll();
  }

  async deleteById(id: string) {
    return this.articleRepo.deleteById(id);
  }

  async findPublishedPaginated(
    page = 1,
    limit = 9,
    search = '',
  ): Promise<{ articles: Article[]; totalHits: number }> {
    const skip = (page - 1) * limit;
    const [articles, totalHits] = await Promise.all([
      this.articleRepo.findApprovedPaginated(skip, limit, search),
      this.articleRepo.countApproved(search),
    ]);
    return { articles, totalHits };
  }

  async findPending(): Promise<Article[]> {
    return this.articleRepo.findPending();
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
      const fullContent = await rssParsers.mediumContent(dto.sourceUrl);
      if (fullContent) {
        dto.content = fullContent;
      }
      const combinedText = `${dto.title} ${dto.content}`;
      if (!isLikelyReadableLanguage(combinedText)) {
        console.warn(
          `🚫 Стаття не українською/англійською: "${dto.title}","${dto.content}"`,
        );
        continue;
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
    const articles = await articlesAddFilter(dtos, this.articleRepo);
    for (const dto of articles) {
      await this.create(dto);
    }
  }

  async parseAndStoreSmashingArticles(smashingFeedUrl: string): Promise<void> {
    const dtos = await rssParsers.smashingFeed(smashingFeedUrl);
    const articles = await articlesAddFilter(dtos, this.articleRepo);
    for (const dto of articles) {
      await this.create(dto);
    }
  }

  async parseAndStoreArticles(
    prototyprFeedUrl: string,
    smashingFeedUrl: string,
  ): Promise<void> {
    let articles: CreateArticleDto[] = [];
    const prototyprDtos = await rssParsers.prototyprFeed(prototyprFeedUrl);

    articles = await articlesAddFilter(prototyprDtos, this.articleRepo);

    if (articles.length < articlesDayCount) {
      const smashingDtos = await rssParsers.smashingFeed(smashingFeedUrl);
      const smashingArticles = await articlesAddFilter(
        smashingDtos,
        this.articleRepo,
      );
      articles = articles.concat(
        smashingArticles.slice(0, articlesDayCount - articles.length),
      );
    }
    for (const dto of articles) {
      await this.create(dto);
    }
  }

  // async insertMany(articles: Article[]) {
  //   await this.articleRepo.insertMany(articles);
  //   return { inserted: articles.length };
  // }
}
