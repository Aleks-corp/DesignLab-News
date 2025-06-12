import Parser from 'rss-parser';
import { CreateArticleDto } from '../../dto/create-article.dto.js';
import { rssParsers } from '../index.js';

const parser = new Parser();

export async function parsePrototyprRssFeed(
  baseUrl: string,
): Promise<CreateArticleDto[]> {
  const allDtos: CreateArticleDto[] = [];

  try {
    const feed = await parser.parseURL(baseUrl);
    const dtos = feed.items.map((item) => rssParsers.prototypr(item));
    allDtos.push(...dtos);
  } catch (err) {
    if (err instanceof Error) {
      console.warn(`❌ Помилка при парсингу: ${err.message}`);
    } else {
      console.warn(`❌ Помилка при парсингу:`, err);
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
