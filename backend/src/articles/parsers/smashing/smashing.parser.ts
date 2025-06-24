import * as cheerio from 'cheerio';
import { CreateArticleDto } from '../../dto/create-article.dto.js';
import cleanSourceUrl from '../../utils/clean-url.js';
import { extractENExcerptFromContent } from '../../utils/article-excerpt-translate.js';

export interface SmashingItem {
  title?: string;
  content?: string;
  link?: string;
  guid?: string;
  description?: string;
  categories?: string[];
  author?: string;
  creator?: string;
  pubDate?: string;
  'dc:creator'?: string;
}

export function parseSmashingRssItemToDto(
  item: SmashingItem,
): CreateArticleDto {
  const rawContent = `${item['content:encoded']}` || '';
  const $ = cheerio.load(rawContent);

  const keywords = [
    'resources',
    'further reading on smashingmag',
    'further reading on smashing magazine',
  ];

  $('h3').each((i, el) => {
    const h3Text = $(el).text().toLowerCase();

    if (keywords.some((keyword) => h3Text.includes(keyword))) {
      const h3 = $(el);
      const next = h3.next();

      h3.remove();
      if (next.is('ul')) {
        next.remove();
      }
    }
  });

  let imageUrl: string | undefined;
  $('img').each((_, el) => {
    const img = $(el);

    // Якщо imageUrl ще не заданий і src існує — беремо цю картинку
    if (!imageUrl) {
      const src = img.attr('src');
      if (src) {
        imageUrl = src;
      }
    }

    // Тепер видаляємо 1x1 і трекери
    const width = parseInt(img.attr('width') || '0');
    const height = parseInt(img.attr('height') || '0');
    const src = img.attr('src') || '';

    if (width === 1 && height === 1) {
      img.remove();
    } else if (src.includes('stat?event=post.clientViewed')) {
      img.remove();
    }
  });
  $('img').each((i, img) => {
    if (!$(img).attr('width')) {
      $(img).attr('style', 'width: 100%; height: auto; display: block;');
    }
  });

  const cleanedContent = $('body').html() || '';
  const excerpt = extractENExcerptFromContent(cleanedContent);
  const categories = Array.isArray(item.categories)
    ? item.categories.map((c) => String(c))
    : [];

  const rawUrl = item.link || item.guid || '';
  const cleanedUrl = cleanSourceUrl(rawUrl);

  const dto: CreateArticleDto = {
    title: item.title || 'Без назви',
    content: cleanedContent,
    excerpt,
    sourceUrl: cleanedUrl,
    imageUrl,
    categories,
    author:
      item.author?.trim() ||
      item.creator?.trim() ||
      item['dc:creator']?.trim() ||
      'Автор невідомий',
    publishedAt: item.pubDate
      ? new Date(item.pubDate).toISOString()
      : undefined,
    source: 'Smashing Magazine',
    status: 'raw',
  };
  return dto;
}
