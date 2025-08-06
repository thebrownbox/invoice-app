import { Injectable } from '@nestjs/common';
import * as PdfPrinter from 'pdfmake';
import * as getStream from 'get-stream';

@Injectable()
export class AppService {
  async generateInvoice(): Promise<Buffer> {
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: 'INVOICE', style: 'header' },
        {
          table: {
            widths: ['*', '*', '*', '*'],
            body: [
              ['Item', 'Quantity', 'Unit Price', 'Total'],
              ['Widget A', '2', '$10', '$20'],
              ['Widget B', '1', '$15', '$15'],
              [{ text: 'Total', colSpan: 3 }, {}, {}, '$35'],
            ],
          },
        },
      ],
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.end();
    return await getStream.buffer(pdfDoc);
  }
}
