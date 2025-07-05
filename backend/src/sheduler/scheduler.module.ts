import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service.js';
import { ArticlesModule } from '../articles/articles.module.js';
import { GptModule } from '../gpt/gpt.module.js';
import { SchedulerController } from './sheduler.controller.js';

@Module({
  imports: [ScheduleModule.forRoot(), ArticlesModule, GptModule],
  providers: [SchedulerService],
  controllers: [SchedulerController],
})
export class SchedulerModule {}
