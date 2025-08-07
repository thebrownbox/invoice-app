import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, Trash2, User, Mail, MapPin, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { useInvoice } from '@/contexts/InvoiceContext';

export const EditingComponent = () => {
  const { items, addItem, updateItem, deleteItem, getTotalAmount, settings, setSettings } = useInvoice();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [isCustomerInfoOpen, setIsCustomerInfoOpen] = React.useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: settings.currency,
    }).format(amount);
  };

  const updateClient = (field: keyof typeof settings.client, value: string) => {
    setSettings({
      ...settings,
      client: {
        ...settings.client,
        [field]: value
      }
    });
  };

  const subtotal = getTotalAmount();
  const tax = subtotal * (settings.taxRate / 100);
  const total = subtotal + tax;

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Customer Information Section */}
      <Collapsible open={isCustomerInfoOpen} onOpenChange={setIsCustomerInfoOpen}>
        <Card className="gradient-card shadow-medium border-0">
          <CardHeader className="pb-3">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full p-0 h-auto justify-between hover:bg-transparent">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
                {isCustomerInfoOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Customer Name</label>
                  <Input
                    value={settings.client.name}
                    onChange={(e) => updateClient('name', e.target.value)}
                    placeholder="Enter customer name"
                    className="border-0 bg-background/50 focus:bg-background shadow-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </label>
                  <Input
                    value={settings.client.address}
                    onChange={(e) => updateClient('address', e.target.value)}
                    placeholder="Enter customer address"
                    className="border-0 bg-background/50 focus:bg-background shadow-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <Input
                    type="email"
                    value={settings.client.email}
                    onChange={(e) => updateClient('email', e.target.value)}
                    placeholder="Enter customer email"
                    className="border-0 bg-background/50 focus:bg-background shadow-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={settings.client.phone}
                    onChange={(e) => updateClient('phone', e.target.value)}
                    placeholder="Enter customer phone number"
                    className="border-0 bg-background/50 focus:bg-background shadow-none"
                  />
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

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