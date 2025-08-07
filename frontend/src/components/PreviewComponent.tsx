import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useInvoice } from '@/contexts/InvoiceContext';
import { CreateInvoiceDto } from '@/types/invoice';

export const PreviewComponent = () => {
  const { items, settings, getTotalAmount } = useInvoice();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: settings.currency,
    }).format(amount);
  };

  const subtotal = getTotalAmount();
  const tax = subtotal * (settings.taxRate / 100);
  const total = subtotal + tax;

  const handleExport = async () => {
    try {
      // Transform frontend data to match CreateInvoiceDto structure
      const createInvoicePayload: CreateInvoiceDto = {
        customer: {
          name: settings.client.name,
          address: settings.client.address,
          email: settings.client.email,
          phone: settings.client.phone,
        },
        items: items.map(item => ({
          description: item.name,
          quantity: item.qty,
          unitPrice: item.price,
        })),
        invoiceNumber: settings.invoiceNumber,
        date: settings.date,
        notes: 'Thank you for your business!',
      };

      console.log('Sending invoice data to backend:', createInvoicePayload);

      const response = await fetch('http://localhost:3000/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createInvoicePayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // The response is a PDF file (application/pdf)
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url, '_blank');

      // // Optionally, revoke the object URL after some time
      // setTimeout(() => window.URL.revokeObjectURL(url), 1000);

      // // In a real app, this would trigger PDF download
      // alert('Invoice exported successfully! PDF generation would be handled by the backend.');

    } catch (error) {
      console.error('Error exporting invoice:', error);
      alert('Failed to export invoice. Please check the console for details.');
    }
  };

  return (
    <div className="h-full p-6 border-l bg-muted/20">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice Preview
          </h2>
          <Button onClick={handleExport} variant="premium" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>

        <Card className="shadow-large border-0 bg-card">
          <CardContent className="p-8 space-y-8">
            {/* Header with INVOICE title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary">INVOICE</h1>
            </div>

            {/* Billing Information */}
            <div className="flex justify-between items-start">
              {/* Billed To Section */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-primary mb-3">Billed To:</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {settings.client.name}</p>
                  <p><strong>Address:</strong> {settings.client.address}</p>
                  <p><strong>Email:</strong> {settings.client.email}</p>
                  <p><strong>Phone Number:</strong> {settings.client.phone}</p>
                </div>
              </div>

              {/* Date and Invoice Number */}
              <div className="flex-1 text-right">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground"><strong>Date:</strong></p>
                    <p className="font-medium">{settings.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground"><strong>Invoice #:</strong></p>
                    <p className="font-medium">{settings.invoiceNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 grid grid-cols-4 gap-4 p-3 text-sm font-medium">
                <div>Item</div>
                <div className="text-right">Quantity</div>
                <div className="text-right">Unit Price</div>
                <div className="text-right">Total</div>
              </div>
              {items.map((item, index) => (
                <div key={item.id} className={`grid grid-cols-4 gap-4 p-3 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-right">{item.qty}</div>
                  <div className="text-right">{formatCurrency(item.price)}</div>
                  <div className="text-right font-medium">{formatCurrency(item.total)}</div>
                </div>
              ))}
              {/* Total Row */}
              <div className="grid grid-cols-4 gap-4 p-3 text-sm font-bold bg-gray-100">
                <div>Total</div>
                <div></div>
                <div></div>
                <div className="text-right">{formatCurrency(total)}</div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Thank you for your business!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};