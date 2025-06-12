import * as cheerio from 'cheerio';
import { CreateArticleDto } from '../../dto/create-article.dto.js';
import cleanSourceUrl from '../../utils/clean-url.js';

export interface MediumItem {
  title?: string;
  content?: string;
  link?: string;
  guid?: string;
  description?: string;
  categories?: string[];
  creator?: string;
  pubDate?: string;
  'dc:creator'?: string;
}

export function parseMediumRssItemToDto(item: MediumItem): CreateArticleDto {
  const $ = cheerio.load(item.content || item.description || '');

  const imageUrl = $('img').first().attr('src') || undefined;

  const content = $('p')
    .map((_, el) => $(el).text())
    .get()
    .join('\n\n')
    .trim();

  const categories = Array.isArray(item.categories)
    ? item.categories.map((c) => String(c))
    : [];

  const rawUrl = item.link || item.guid || '';
  const cleanedUrl = cleanSourceUrl(rawUrl);

  const dto: CreateArticleDto = {
    title: item.title || 'Без назви',
    content: content || '...',
    sourceUrl: cleanedUrl,
    imageUrl,
    categories,
    author:
      item.creator?.trim() || item['dc:creator']?.trim() || 'Автор невідомий',
    publishedAt: item.pubDate
      ? new Date(item.pubDate).toISOString()
      : undefined,
    source: 'medium',
    status: 'raw',
  };
  return dto;
}
