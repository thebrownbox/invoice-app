import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { useInvoice } from '@/contexts/InvoiceContext';

export const EditingComponent = () => {
  const { items, addItem, updateItem, deleteItem, getTotalAmount, settings } = useInvoice();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: settings.currency,
    }).format(amount);
  };

  const subtotal = getTotalAmount();
  const tax = subtotal * (settings.taxRate / 100);
  const total = subtotal + tax;

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Summary Section */}
      <Card className="gradient-card shadow-medium border-0">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            {settings.taxRate > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tax ({settings.taxRate}%):</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-lg font-semibold text-primary border-t pt-3">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items List Section */}
      <Card className="flex-1 gradient-card shadow-medium border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-primary">Invoice Items</CardTitle>
          <Button onClick={addItem} variant="hero" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-12 gap-3 text-sm font-medium text-muted-foreground border-b pb-2">
            <div className="col-span-4">Item Name</div>
            <div className="col-span-3">Price</div>
            <div className="col-span-2">Qty</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-1"></div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-3 items-center p-3 rounded-lg bg-background/50 shadow-soft transition-smooth hover:shadow-medium"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="col-span-4">
                  <Input
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="Item name"
                    className="border-0 bg-transparent focus:bg-background shadow-none"
                  />
                </div>
                
                <div className="col-span-3">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price || ''}
                    onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="border-0 bg-transparent focus:bg-background shadow-none"
                  />
                </div>
                
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.qty || ''}
                    onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 1)}
                    placeholder="1"
                    className="border-0 bg-transparent focus:bg-background shadow-none"
                  />
                </div>
                
                <div className="col-span-2 font-semibold text-primary">
                  {formatCurrency(item.total)}
                </div>
                
                <div className="col-span-1 flex justify-center">
                  {hoveredItem === item.id && items.length > 1 && (
                    <Button
                      onClick={() => deleteItem(item.id)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 transition-bounce"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};