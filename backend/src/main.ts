import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import 'dotenv/config';
import { AllExceptionsFilter } from './common/middleware/all-exceptions.filter.js';
// import startSelfPing from './common/middleware/self.ping.js';

async function bootstrap() {
  const port = process.env.PORT ?? 3030;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.TEST ? true : [process.env.NEXT_URL],
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  // startSelfPing();
  await app.listen(port, () => {
    console.log(`Database connection successful on port ${port}`);
  });
}
bootstrap().catch((err) => {
  console.error('❌ Error during bootstrap:', err);
  process.exit(1);
});
