import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('health-check')
  ping(): string {
    return 'pong';
  }
}
