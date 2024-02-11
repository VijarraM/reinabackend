import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { buildSuccessfulResponse } from 'src/common/helpers';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.createProduct(createProductDto);
    } catch (error) {
      if (error.code === 'P2002')
        throw new BadRequestException('Product name already exists');
    }
  }

  @Get()
  async getAllProducts(@Query('name') name: string) {
    const products = await this.productsService.getAllProducts(name);
    console.log({ products });

    return buildSuccessfulResponse('Products retrieved successfully', products);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productsService.getProductById(Number(id));

    return buildSuccessfulResponse('Product retrieved successfully', product);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto) {
    try {
      return await this.productsService.updateProduct(Number(id), data);
    } catch (error) {
      throw new NotFoundException('Product does not exist');
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    try {
      return await this.productsService.deleteProduct(Number(id));
    } catch (error) {
      throw new NotFoundException('Product does not exist');
    }
  }
}
