import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getInvoice(@Res() res: Response) {
    const buffer = await this.appService.generateInvoice();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=invoice.pdf',
    });
    res.send(buffer);
  }
}
