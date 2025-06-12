import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { TranslateArticlesRepository } from '../repositories/tranclate.articles.repo.js';

@Injectable()
export class GptService {
  private openai: OpenAI;

  constructor(private readonly articleRepo: TranslateArticlesRepository) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(prompt: string): Promise<string> {
    const chat = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    return chat.choices[0].message.content || '';
  }

  async translateArticle(
    title: string,
    content: string,
  ): Promise<{ title: string; content: string }> {
    const prompt = `Translate the following UX/UI design article to Ukrainian.

⚠️ VERY IMPORTANT INSTRUCTIONS:
- Keep all HTML tags (<p>, <a>, <img>, etc.) unchanged.
- Only translate human-readable text **inside** the tags.
- DO NOT translate attributes like href, src, alt, class, etc.
- DO NOT change HTML structure.
- DO NOT wrap with additional tags.
- Preserve original paragraph and element structure.
- Keep line breaks and indentation as in original.

---

Title: ${title}

Content:
${content}
`;

    const res = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const raw = res.choices[0].message?.content ?? '';

    const titleMatch = raw.match(/Title:\s*(.+)/i);
    const contentMatch = raw.match(/Content:\s*([\s\S]+)/i);

    const translatedTitle = titleMatch ? titleMatch[1].trim() : 'Без назви';
    const translatedContent = contentMatch
      ? contentMatch[1].trim()
      : raw.trim();

    return {
      title: translatedTitle,
      content: translatedContent,
    };
  }

  async translateRawArticles(): Promise<number> {
    const rawArticles = await this.articleRepo.findManyByStatus('raw');
    if (!rawArticles) {
      return 0;
    }

    for (const article of rawArticles) {
      try {
        const { title, content } = await this.translateArticle(
          article.title,
          article.content,
        );

        article.original = {
          title: article.title,
          content: article.content,
        };
        article.title = title;
        article.content = content;
        article.status = 'underreview';

        await this.articleRepo.update(String(article._id), article);
      } catch (err) {
        if (err instanceof Error) {
          console.error(
            `❌ Помилка при перекладі "${article.title}":`,
            err.message,
          );
        } else {
          console.error(
            `❌ Невідома помилка при перекладі "${article.title}":`,
            err,
          );
        }
      }
    }

    return rawArticles.length;
  }
}
