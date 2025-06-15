// import { franc } from 'franc';
import langdetect from 'langdetect';

interface LangDetect {
  detectOne: (text: string) => string;
}

const detector = langdetect as unknown as LangDetect;

export function isLikelyReadableLanguage(text: string): boolean {
  const lang = detector.detectOne(text);

  return lang === 'uk' || lang === 'en';
}
