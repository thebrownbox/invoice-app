import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useInvoice } from '@/contexts/InvoiceContext';

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

  const handleExport = () => {
    // In a real app, this would generate and download a PDF
    const invoiceData = {
      settings,
      items,
      subtotal,
      tax,
      total,
      date: new Date().toLocaleDateString(),
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`
    };
    
    console.log('Exporting invoice:', invoiceData);
    // Placeholder for PDF generation
    alert('Invoice export functionality would be implemented here!');
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

        <Card className="gradient-card shadow-large border-0">
          <CardContent className="p-8 space-y-8">
            {/* Header */}
            <div className="border-b pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-2">INVOICE</h1>
                  <p className="text-muted-foreground">#{`INV-${Date.now().toString().slice(-6)}`}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h3 className="font-semibold text-lg text-primary mb-3">From:</h3>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{settings.companyName}</p>
                <p className="text-muted-foreground">{settings.companyAddress}</p>
                <p className="text-muted-foreground">{settings.companyEmail}</p>
                <p className="text-muted-foreground">{settings.companyPhone}</p>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <h3 className="font-semibold text-lg text-primary mb-4">Items:</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 grid grid-cols-5 gap-4 p-3 text-sm font-medium text-muted-foreground">
                  <div className="col-span-2">Description</div>
                  <div className="text-right">Price</div>
                  <div className="text-right">Qty</div>
                  <div className="text-right">Total</div>
                </div>
                {items.map((item, index) => (
                  <div key={item.id} className={`grid grid-cols-5 gap-4 p-3 text-sm ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                    <div className="col-span-2 font-medium">{item.name || 'Untitled Item'}</div>
                    <div className="text-right">{formatCurrency(item.price)}</div>
                    <div className="text-right">{item.qty}</div>
                    <div className="text-right font-medium">{formatCurrency(item.total)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="border-t pt-6">
              <div className="space-y-2 max-w-xs ml-auto">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                {settings.taxRate > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax ({settings.taxRate}%):</span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-primary border-t pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};