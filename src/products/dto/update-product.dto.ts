import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  purchasePrice: number;

  @IsNumber()
  @IsOptional()
  salePrice: number;

  @IsBoolean()
  @IsOptional()
  useStock: boolean;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  supplier: string;

  @IsOptional()
  @IsNumber()
  stock: number;
}
