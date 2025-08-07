import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InvoiceItemDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class InvoiceCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class InvoiceCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class CreateInvoiceDto {
  @ValidateNested()
  @Type(() => InvoiceCompanyDto)
  company: InvoiceCompanyDto;

  @ValidateNested()
  @Type(() => InvoiceCustomerDto)
  customer: InvoiceCustomerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];

  @IsString()
  @IsOptional()
  invoiceNumber?: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

// Example payload for CreateInvoiceDto
export const exampleCreateInvoicePayloadJson: string = JSON.stringify(
  {
    company: {
      name: 'Your Company',
      address: '123 Business St, City, State 12345',
      email: 'contact@yourcompany.com',
      phone: '+1 (555) 123-4567',
    },
    customer: {
      name: 'John Doe',
      address: '123 Main St, Springfield, USA',
      email: 'john.doe@example.com',
      phone: '+1 555-1234',
    },
    items: [
      {
        description: 'Widget A',
        quantity: 2,
        unitPrice: 10.0,
      },
      {
        description: 'Widget B',
        quantity: 1,
        unitPrice: 15.0,
      },
    ],
    invoiceNumber: '0001',
    date: '2024-06-01 10:00:00',
    notes: 'Thank you for your business!',
  },
  null,
  2,
);
