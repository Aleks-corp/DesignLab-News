import { CreateArticleDto } from '../dto/create-article.dto.js';
import { ArticlesRepository } from '../repositories/articles.repo.js';
import { isLikelyReadableLanguage } from './article-language-filter.js';
import isRelevantForDesigners from './article-topic-filter.js';
import { articlesDayCount } from './articlesDayCount.js';

export const articlesAddFilter = async (
  dtos: CreateArticleDto[],
  articleRepo: ArticlesRepository,
): Promise<CreateArticleDto[]> => {
  const articles: CreateArticleDto[] = [];
  for (const dto of dtos) {
    if (dto.content === 'undefined') {
      console.warn(`⚠️ Content is empty: ${dto.sourceUrl}`);
      continue;
    }
    const existsInDb = await articleRepo.findBySourceUrl(dto.sourceUrl);
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

    if (!isRelevantForDesigners(dto)) {
      console.warn(`🚫 Не релевантна для дизайнерів: "${dto.title}"`);
      continue;
    }

    let cleanedContent = dto.content;
    const splitMarker = 'Listen\n\nShare\n\n';
    const parts = cleanedContent.split(splitMarker);

    cleanedContent = parts.length > 1 ? parts[1].trim() : cleanedContent.trim();

    dto.content = cleanedContent;
    console.log(` Знайдена нова стаття: "${dto.title}"`);
    articles.push(dto);
  }
  articles.splice(0, articlesDayCount);
  return articles;
};
