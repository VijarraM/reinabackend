import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  createProduct(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  getAllProducts(name: string): Promise<Product[]> {
    console.log({ name });

    if (!name) return this.prisma.product.findMany();
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
