import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import 'dotenv/config';

async function bootstrap() {
  const port = process.env.PORT ?? 3030;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`Database connection successful on port ${port}`);
  });
}
bootstrap().catch((err) => {
  console.error('❌ Error during bootstrap:', err);
  process.exit(1);
});
