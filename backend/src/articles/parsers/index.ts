import { parseMediumRssItemToDto } from './medium/medium.parser.js';
import { parseMediumRssFeed } from './medium/medium.feed-parser.js';
import { fetchFullArticleContent } from './medium/medium.full-article-content-parser.js';
import { parsePrototyprRssFeed } from './prototypr/prototypr.feed-parser.js';
import { parsePrototyprRssItemToDto } from './prototypr/prototypr.parser.js';
// import { parseNngroupItemToDto } from './nngroup.parser';
import { parseSmashingRssFeed } from './smashing/smashing.feed-parser.js';
import { parseSmashingRssItemToDto } from './smashing/smashing.parser.js';

export const rssParsers = {
  medium: parseMediumRssItemToDto,
  mediumFeed: parseMediumRssFeed,
  mediumContent: fetchFullArticleContent,
  prototyprFeed: parsePrototyprRssFeed,
  prototypr: parsePrototyprRssItemToDto,
  //   nngroup: parseNngroupItemToDto,
  smashingFeed: parseSmashingRssFeed,
  smashing: parseSmashingRssItemToDto,
};

export type ParserKey = keyof typeof rssParsers;
