import { Module } from '@nestjs/common';
import { GptService } from '../service/gpt.service.js';

@Module({
  providers: [GptService],
  exports: [GptService],
})
export class GptModule {}
