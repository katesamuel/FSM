import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAny } from './shared/decorators/allow-any.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowAny()
  @Get()
  getData(): string {
    return this.appService.getData();
  }
}
