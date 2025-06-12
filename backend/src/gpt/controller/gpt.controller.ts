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
    const answer = await this.gptService.translateRawArticles();
    return { message: `Перекладено ${answer} статей зі статусом 'raw'` };
  }

  @Post('translate')
  async translate(@Body('content') title: string, content: string) {
    const resp = await this.gptService.translateArticle(title, content);
    return {
      message: `Перекладено ${resp.title} статею із вмістом '${resp.title}'`,
    };
  }
}
