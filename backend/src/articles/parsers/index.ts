import { parseMediumRssItemToDto } from './medium.parser.js';
import { parseMediumRssFeed } from './medium.feed-parser.js';
import { fetchFullArticleContent } from './medium.full-article-content-parser.js';
// import { parseNngroupItemToDto } from './nngroup.parser';
// import { parseSmashingItemToDto } from './smashing.parser';

export const rssParsers = {
  medium: parseMediumRssItemToDto,
  mediumFeed: parseMediumRssFeed,
  mediumContent: fetchFullArticleContent,
  //   nngroup: parseNngroupItemToDto,
  //   smashing: parseSmashingItemToDto,
};

export type ParserKey = keyof typeof rssParsers;
