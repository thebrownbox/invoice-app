import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InvoiceItem, InvoiceSettings, User } from '@/types/invoice';

interface InvoiceContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  items: InvoiceItem[];
  setItems: (items: InvoiceItem[]) => void;
  settings: InvoiceSettings;
  setSettings: (settings: InvoiceSettings) => void;
  addItem: () => void;
  updateItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  deleteItem: (id: string) => void;
  getTotalAmount: () => number;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

const defaultSettings: InvoiceSettings = {
  companyName: 'Your Company',
  companyAddress: '123 Business St, City, State 12345',
  companyEmail: 'contact@yourcompany.com',
  companyPhone: '+1 (555) 123-4567',
  currency: 'USD',
  taxRate: 0
};

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      name: 'Sample Item',
      price: 100,
      qty: 1,
      total: 100
    }
  ]);
  const [settings, setSettings] = useState<InvoiceSettings>(defaultSettings);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      qty: 1,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate total when price or qty changes
        if (field === 'price' || field === 'qty') {
          updatedItem.total = updatedItem.price * updatedItem.qty;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <InvoiceContext.Provider value={{
      user,
      setUser,
      items,
      setItems,
      settings,
      setSettings,
      addItem,
      updateItem,
      deleteItem,
      getTotalAmount
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};