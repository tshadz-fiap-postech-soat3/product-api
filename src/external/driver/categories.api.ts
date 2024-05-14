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
import { CreateCategoryDto } from '../../@core/category/entitites/create-category.dto';
import { UpdateCategoryDto } from '../../@core/category/entitites/update-category.dto';
import { CategoriesController } from '../../@core/category/controller/categories.controller';

@ApiTags('category')
@Controller('categories')
export class CategoriesApi {
  constructor(private readonly categoriesController: CategoriesController) {}

  @Post()
  @ApiOperation({ summary: 'create a new category' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesController.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'return all categories created' })
  async findAll() {
    return await this.categoriesController.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'return one category data' })
  async findOne(@Param('id') id: string) {
    return await this.categoriesController.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update the data' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesController.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete the category' })
  async remove(@Param('id') id: string) {
    return await this.categoriesController.remove(id);
  }
}
