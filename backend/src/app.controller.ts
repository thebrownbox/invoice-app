import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as html_to_pdf from 'html-pdf-node';

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

  @Get('v1')
  async getInvoiceByPuppeteer(@Res() res: Response) {
    const options = { format: 'A4' };
    const file = { content: '<h1>Welcome to html-pdf-node</h1>' };

    html_to_pdf
      .generatePdf(file, options)
      .then((output) => {
        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename=invoice.pdf',
        });
        res.send(output);
      })
      .catch((err) => {
        console.log('Error:-', err);
      })
      .finally(() => {
        // res.send('Finished');
        console.log('Finished');
      });
  }
}
