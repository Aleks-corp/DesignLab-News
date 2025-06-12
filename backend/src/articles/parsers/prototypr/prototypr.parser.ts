import * as cheerio from 'cheerio';
import { CreateArticleDto } from '../../dto/create-article.dto.js';
import cleanSourceUrl from '../../utils/clean-url.js';

export interface PrototyprItem {
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

export function parsePrototyprRssItemToDto(
  item: PrototyprItem,
): CreateArticleDto {
  const rawContent = `${item['content:encoded']}` || '';

  const $ = cheerio.load(rawContent);
  $('figure').each((_, el) => {
    const figure = $(el);
    const innerHtml = figure.html();
    if (innerHtml) {
      figure.replaceWith(innerHtml);
    } else {
      figure.remove();
    }
  });

  const paragraphs = $('p');
  const lastP = paragraphs.last();
  if (lastP.text().toLowerCase().includes('was originally published')) {
    lastP.remove();
  }

  let imageUrl: string | undefined;
  $('img').each((_, el) => {
    const img = $(el);
    const width = parseInt(img.attr('width') || '0');
    const height = parseInt(img.attr('height') || '0');

    if ((width > 1 || height > 1) && !imageUrl) {
      imageUrl = img.attr('src') || undefined;
    }

    // Видаляємо 1x1 або трекер Medium
    const src = img.attr('src') || '';
    if (width === 1 && height === 1) {
      img.remove();
    } else if (src.includes('stat?event=post.clientViewed')) {
      img.remove();
    }
  });

  const cleanedContent = $('body').html() || '';

  const categories = Array.isArray(item.categories)
    ? item.categories.map((c) => String(c))
    : [];

  const rawUrl = item.link || item.guid || '';
  const cleanedUrl = cleanSourceUrl(rawUrl);

  const dto: CreateArticleDto = {
    title: item.title || 'Без назви',
    content: cleanedContent,
    sourceUrl: cleanedUrl,
    imageUrl,
    categories,
    author:
      item.creator?.trim() || item['dc:creator']?.trim() || 'Автор невідомий',
    publishedAt: item.pubDate
      ? new Date(item.pubDate).toISOString()
      : undefined,
    source: 'prototypr',
    status: 'raw',
  };
  return dto;
}
