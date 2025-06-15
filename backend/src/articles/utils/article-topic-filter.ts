import { CreateArticleDto } from '../dto/create-article.dto.js';

function cleanText(html: string): string {
  // Видаляємо <a> теги з вмістом
  let cleaned = html.replace(/<a[\s\S]*?<\/a>/gi, ' ');
  // Видаляємо <img> теги (в них нема вмісту, лише атрибути)
  cleaned = cleaned.replace(/<img[\s\S]*?>/gi, ' ');
  // Видаляємо всі інші теги
  cleaned = cleaned.replace(/<[^>]*>/g, ' ');
  // Міняємо послідовні пробіли на один
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

function isRelevantForDesigners(dto: CreateArticleDto): boolean {
  if (!dto.content) return false;

  const designerKeywords = [
    'ux design',
    'ui design',
    'user experience',
    'user interface',
    'figma',
    'adobe xd',
    'adobe illustrator',
    'adobe photoshop',
    'sketch app',
    'affinity designer',
    'ux research',
    'wireframe',
    'mockup',
    'animation',
    'animations',
    'prototype',
    'prototyping',
    'visual design',
    'design thinking',
    'interaction design',
    'product design',
    'graphic design',
    'graphic designer',
    'design system',
    'responsive design',
    'accessibility design',
    'design portfolio',
  ];

  const excludedPhrases = [
    'sponsored by',
    'this article is sponsored',
    'partnered post',
    'promoted by',
    'paid partnership',
    'in partnership with',
    'advertisement',
    'advertorial',
    'brought to you by',
    'this post is sponsored',
  ];

  const rawText = `${dto.title} ${dto.content}`.toLowerCase();
  const text = cleanText(rawText);

  const hasDesignKeywords = designerKeywords.some((kw) => {
    const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKw}\\b`, 'i');
    return regex.test(text);
  });

  const hasExcludedPhrase = excludedPhrases.some((phrase) =>
    text.includes(phrase),
  );

  return hasDesignKeywords && !hasExcludedPhrase;
}

export default isRelevantForDesigners;
