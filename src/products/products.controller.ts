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
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const productFound = await this.productsService.getProductById(Number(id));
    if (!productFound) throw new NotFoundException('Product not Found');
    return productFound;
  }

  @Get('search')
  async searchProductsByName(@Query('name') name: string) {
    console.log(name);

    if (!name) {
      throw new BadRequestException('Name parameter is required');
    }

    const productsFound = await this.productsService.searchProductsByName(name);
    if (productsFound.length === 0)
      throw new NotFoundException('No products found with that name');
    return productsFound;
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
