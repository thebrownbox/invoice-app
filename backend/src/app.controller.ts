import { Controller, Get, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as html_to_pdf from 'html-pdf-node';
import { CreateInvoiceDto } from './invoice.request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Res() res: Response,
  ) {
    const buffer = await this.appService.generateInvoice(createInvoiceDto);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=invoice.pdf',
    });
    res.send(buffer);
  }

  @Get('puppeteer')
  async getInvoiceByPuppeteer(@Res() res: Response) {
    const options = { format: 'A4' };
    // Generate a simple invoice HTML content
    const invoiceHtml = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .header h1 { margin: 0; }
            .customer-details, .invoice-details { margin-bottom: 20px; }
            .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; }
            .invoice-table th { background-color: #f2f2f2; }
            .total-row td { font-weight: bold; }
            .footer { text-align: center; margin-top: 40px; font-size: 0.9em; color: #888; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>INVOICE</h1>
            <div>Invoice #: 0001</div>
            <div>Date: ${new Date().toLocaleString('en-US')}</div>
          </div>
          <div class="customer-details">
            <strong>Billed To:</strong><br>
            John Doe<br>
            123 Main St, Springfield, USA<br>
            john.doe@example.com<br>
            +1 555-1234
          </div>
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Widget A</td>
                <td>2</td>
                <td>$10</td>
                <td>$20</td>
              </tr>
              <tr>
                <td>Widget B</td>
                <td>1</td>
                <td>$15</td>
                <td>$15</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" style="text-align:right;">Total</td>
                <td>$35</td>
              </tr>
            </tbody>
          </table>
          <div class="footer">
            Thank you for your business!
          </div>
        </body>
      </html>
    `;
    const file = { content: invoiceHtml };
    console.log(`start generate pdf`);
    const start = new Date();
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
        const end = new Date();
        console.log(`end generate pdf: ${end.getTime() - start.getTime()}ms`);
      });
  }
}
