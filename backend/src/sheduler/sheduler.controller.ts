import { Controller, Get } from '@nestjs/common';

@Controller('sheduler')
export class SchedulerController {
  @Get('ping')
  ping() {
    return { status: 'ok', time: new Date().toISOString() };
  }
}
