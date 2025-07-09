import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module.js';
import 'dotenv/config';
import { GptModule } from './gpt/gpt.module.js';
import { AuthModule } from './auth/auth.module.js';
import { SchedulerModule } from './sheduler/scheduler.module.js';
import { LoggerMiddleware } from './common/middleware/logger.middleware.js';
import { AppController } from './app.controller.js';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    ArticlesModule,
    GptModule,
    AuthModule,
    SchedulerModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
