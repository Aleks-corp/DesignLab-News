import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from '../service/gpt.service.js';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('chat')
  async chat(@Body('prompt') prompt: string) {
    const answer = await this.gptService.chat(prompt);
    return { answer };
  }

  @Post('translate-raw')
  async translateAllRaw() {
    const count = await this.gptService.translateRawArticles();
    return { message: `Перекладено ${count} статей зі статусом 'raw'` };
  }
}
