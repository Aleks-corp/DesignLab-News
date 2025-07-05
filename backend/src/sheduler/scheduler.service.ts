import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ArticlesService } from '../articles/services/articles.service.js';
import { GptService } from '../gpt/service/gpt.service.js';
import 'dotenv/config';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly gptService: GptService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  onModuleInit() {
    const cronTime = process.env.CRON_TIME || '0 13 * * *';
    const job = new CronJob(cronTime, async () => {
      await this.handleArticlesParseAndTranslate();
    });
    this.schedulerRegistry.addCronJob('parse-and-translate', job);
    job.start();
    this.logger.log(
      `Cron job parse-and-translate створено з часом: ${cronTime}`,
    );
  }

  async handleArticlesParseAndTranslate() {
    this.logger.log('Стартую щоденний парсинг статей...');
    const prototyprFeedUrl = 'https://blog.prototypr.io/feed/';
    const smashingFeedUrl = 'https://www.smashingmagazine.com/feed/';
    await this.articlesService.parseAndStoreArticles(
      prototyprFeedUrl,
      smashingFeedUrl,
    );
    this.logger.log('Парсинг завершено, стартую переклад...');
    const count = await this.gptService.translateRawArticles();
    this.logger.log(`Переклад завершено. Перекладено ${count} статей.`);
  }
}
