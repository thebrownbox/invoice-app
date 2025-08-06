import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInvoice } from '@/contexts/InvoiceContext';
import { InvoiceSettings } from '@/types/invoice';

interface InvoiceSettingPopupProps {
  open: boolean;
  onClose: () => void;
}

export const InvoiceSettingPopup = ({ open, onClose }: InvoiceSettingPopupProps) => {
  const { settings, setSettings } = useInvoice();
  const [localSettings, setLocalSettings] = React.useState<InvoiceSettings>(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings, open]);

  const handleSave = () => {
    setSettings(localSettings);
    onClose();
  };

  const handleInputChange = (field: keyof InvoiceSettings, value: string | number) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl gradient-card shadow-large">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">Invoice Settings</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium">Company Name</Label>
              <Input
                id="companyName"
                value={localSettings.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
                className="shadow-soft"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyEmail" className="text-sm font-medium">Company Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={localSettings.companyEmail}
                onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                placeholder="Enter company email"
                className="shadow-soft"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyAddress" className="text-sm font-medium">Company Address</Label>
            <Input
              id="companyAddress"
              value={localSettings.companyAddress}
              onChange={(e) => handleInputChange('companyAddress', e.target.value)}
              placeholder="Enter company address"
              className="shadow-soft"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyPhone" className="text-sm font-medium">Company Phone</Label>
              <Input
                id="companyPhone"
                value={localSettings.companyPhone}
                onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                placeholder="Enter company phone"
                className="shadow-soft"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-sm font-medium">Currency</Label>
              <Input
                id="currency"
                value={localSettings.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                placeholder="USD"
                className="shadow-soft"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxRate" className="text-sm font-medium">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={localSettings.taxRate}
              onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="shadow-soft"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="premium" onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};