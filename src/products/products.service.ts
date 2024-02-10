import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: CreateProductDto): Promise<Product> {
    return await this.prisma.product.create({
      data,
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async getProductById(id: number): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async searchProductsByName(name: string): Promise<Product[]> {
    return await this.prisma.product.findMany({
      where: {
        name: {
          contains: name, // Busca productos cuyo nombre contenga la cadena proporcionada
        },
      },
    });
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
