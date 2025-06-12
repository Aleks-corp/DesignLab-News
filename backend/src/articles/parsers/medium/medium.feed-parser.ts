import Parser from 'rss-parser';
import { CreateArticleDto } from '../../dto/create-article.dto.js';
import { rssParsers } from '../index.js';

const parser = new Parser();

export async function parseMediumRssFeed(
  baseUrl: string,
  tags: string[],
): Promise<CreateArticleDto[]> {
  const allDtos: CreateArticleDto[] = [];
  for (const tag of tags) {
    const url = `${baseUrl}${tag}`;
    try {
      const feed = await parser.parseURL(url);
      const dtos = feed.items.map((item) => rssParsers.medium(item));
      allDtos.push(...dtos);
    } catch (err) {
      if (err instanceof Error) {
        console.warn(`❌ Помилка при парсингу тега "${tag}": ${err.message}`);
      } else {
        console.warn(`❌ Помилка при парсингу тега "${tag}":`, err);
      }
    }
  }
  const uniqueMap = new Map<string, CreateArticleDto>();

  for (const dto of allDtos) {
    if (!uniqueMap.has(dto.sourceUrl)) {
      uniqueMap.set(dto.sourceUrl, dto);
    }
  }
  return Array.from(uniqueMap.values());
}
