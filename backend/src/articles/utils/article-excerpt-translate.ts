import * as cheerio from 'cheerio';

export function extractExcerptFromContent(htmlContent: string): string {
  if (!htmlContent) return '';
  const maxLength = 250;

  try {
    const $ = cheerio.load(htmlContent);
    const firstParagraph = $('p').first().text().trim();
    return firstParagraph;
    if (firstParagraph.length <= maxLength) {
      return firstParagraph;
    }

    // Обрізаємо по слову
    const shortened = firstParagraph.slice(0, maxLength);
    const lastSpace = shortened.lastIndexOf(' ');
    return shortened.slice(0, lastSpace) + '...';
  } catch (error) {
    console.error('Не вдалося витягнути excerpt:', error);
    return '';
  }
}

export function extractENExcerptFromContent(htmlContent: string): string {
  if (!htmlContent) return '';

  try {
    const $ = cheerio.load(htmlContent);
    const firstParagraph = $('p').first().text().trim();
    return firstParagraph.length > 320
      ? firstParagraph.slice(0, 317).trimEnd() + '...'
      : firstParagraph;
  } catch (error) {
    console.error('Не вдалося витягнути excerpt:', error);
    return '';
  }
}
