import { Injectable } from '@nestjs/common';
import * as PdfPrinter from 'pdfmake';
import * as getStream from 'get-stream';
import { CreateInvoiceDto } from './invoice.request.dto';

@Injectable()
export class AppService {
  async generateInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Buffer> {
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };
    const printer = new PdfPrinter(fonts);

    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Example customer details (in a real app, pass as parameters)
    const customer = {
      name: createInvoiceDto.customer.name,
      address: createInvoiceDto.customer.address,
      email: createInvoiceDto.customer.email,
      phone: createInvoiceDto.customer.phone,
    };

    // Generate invoice table rows from createInvoiceDto.items
    const invoiceItems = createInvoiceDto.items || [];
    const tableBody = [
      [
        { text: 'Item', style: 'tableHeader' },
        { text: 'Quantity', style: 'tableHeader' },
        { text: 'Unit Price', style: 'tableHeader' },
        { text: 'Total', style: 'tableHeader' },
      ],
      ...invoiceItems.map((item) => [
        item.description,
        item.quantity.toString(),
        `$${item.unitPrice.toFixed(2)}`,
        `$${(item.quantity * item.unitPrice).toFixed(2)}`,
      ]),
    ];

    // Calculate total amount
    const totalAmount = invoiceItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );

    // Add total row
    tableBody.push([
      { text: 'Total', style: 'tableHeader' },
      { text: '', style: 'tableHeader' },
      { text: '', style: 'tableHeader' },
      { text: `$${totalAmount.toFixed(2)}`, style: 'tableHeader' },
    ]);

    const docDefinition = {
      content: [
        {
          text: 'INVOICE',
          style: 'header',
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            [
              { text: 'Billed To:', bold: true },
              { text: customer.name },
              { text: customer.address },
              { text: customer.email },
              { text: customer.phone },
            ],
            [
              {
                text: `Date: ${createInvoiceDto.date || formattedDate}`,
                alignment: 'right',
              },
              {
                text: `Invoice #: ${createInvoiceDto.invoiceNumber || '0001'}`,
                alignment: 'right',
              },
            ],
          ],
          columnGap: 40,
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            widths: ['*', 'auto', 'auto', 'auto'],
            body: tableBody,
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 20],
        },
        ...(createInvoiceDto.notes
          ? [
              {
                text: createInvoiceDto.notes,
                margin: [0, 0, 0, 20],
              },
            ]
          : []),
        {
          text: 'Thank you for your business!',
          alignment: 'center',
          margin: [0, 30, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        tableHeader: {
          bold: true,
          fillColor: '#eeeeee',
        },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.end();
    return await getStream.buffer(pdfDoc);
  }
}
