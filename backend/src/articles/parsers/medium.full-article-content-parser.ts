import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

export async function fetchFullArticleContent(
  url: string,
): Promise<string | null> {
  try {
    const { data: html }: AxiosResponse<string> = await axios.get<string>(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });
    const $: CheerioAPI = cheerio.load(html);
    const isMemberOnly =
      $('h2').filter((_, el) =>
        $(el).text().toLowerCase().includes('member-only story'),
      ).length > 0;

    if (isMemberOnly) {
      console.warn(`🚫 Member-only story: ${url}`);
      return null;
    }

    const paragraphs = $('article p, article li')
      .map((_, el) => {
        const tag = $(el).prop('tagName');
        const text = $(el).text().trim();
        return tag === 'LI' ? `- ${text}` : text;
      })
      .get()
      .join('\n\n')
      .trim();

    if (!paragraphs) {
      console.warn(`⚠️ Не знайшли текст у <article> для ${url}`);
      return null;
    }

    return paragraphs;
  } catch (err) {
    console.error(`❌ Помилка при завантаженні контенту з ${url}:`, err);
    return null;
  }
}
