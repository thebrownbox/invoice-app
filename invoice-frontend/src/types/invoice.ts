export interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  total: number;
}

export interface InvoiceSettings {
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  currency: string;
  taxRate: number;
}

export interface User {
  name: string;
  email: string;
}