export interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  total: number;
}

// Backend DTO types to match CreateInvoiceDto
export interface InvoiceItemDto {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceCustomerDto {
  name: string;
  address: string;
  email: string;
  phone?: string;
}

export interface CreateInvoiceDto {
  customer: InvoiceCustomerDto;
  items: InvoiceItemDto[];
  invoiceNumber?: string;
  date?: string;
  notes?: string;
}

export interface Client {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface InvoiceSettings {
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  currency: string;
  taxRate: number;
  client: Client;
  invoiceNumber: string;
  date: string;
}

export interface User {
  name: string;
  email: string;
}
