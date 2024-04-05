import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MathService } from './math.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  // constructor(private readonly appService: AppService) {}
  constructor(
    private readonly mathService: MathService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('add')
  // async accumulate(
  //   @Body('data')
  //   data: number[],
  // ) {
  //   this.logger.log('Adding ' + data.toString());
  //   return this.mathService.accumulate(data);
  // }

  @MessagePattern('add')
  async accumulate(data: number[]) {
    this.logger.log('Adding ' + data.toString());
    return this.mathService.accumulate(data);
  }
}
