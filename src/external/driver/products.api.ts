import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsController } from '../../@core/products/controller/products.controller';
import { CreateProductDto } from '../../@core/products/entities/create-product.dto';
import { UpdateProductDto } from '../../@core/products/entities/update-product.dto';

@ApiTags('product')
@Controller('products')
export class ProductsApi {
  constructor(private readonly productsController: ProductsController) {}

  @Post()
  @ApiOperation({ summary: 'create a new prduct' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsController.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'return all products created' })
  findAll() {
    return this.productsController.findAll();
  }

  @Get(':category')
  @ApiOperation({ summary: 'return all products in a specific category' })
  findOne(@Param('category') category: string) {
    return this.productsController.findOne(category);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the data' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsController.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete the product' })
  remove(@Param('id') id: string) {
    return this.productsController.remove(id);
  }
}
