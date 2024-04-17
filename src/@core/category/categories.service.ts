import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './entitites/create-category.dto';
import { UpdateCategoryDto } from './entitites/update-category.dto';
import { ICategoriesRepository } from './repositories/icategory.repository';
import { ICategoriesService } from './icategories.service';
import { ResultError } from '../application/result/result-error';
import { ResultSuccess } from '../application/result/result-success';

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(
    @Inject(ICategoriesRepository)
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.categoriesRepository.insert(createCategoryDto);
    if (!result) {
      return new ResultError('Not able to create the category');
    }
    return new ResultSuccess(result);
  }

  async findAll() {
    const result = await this.categoriesRepository.findAll();
    if (!result) {
      return new ResultError('Category not exist');
    }
    return new ResultSuccess(result);
  }

  async findOne(id: string) {
    const result = await this.categoriesRepository.findById(id);
    if (!result) {
      return new ResultError('Category not exist');
    }
    return new ResultSuccess(result);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoriesRepository.update(
      id,
      updateCategoryDto,
    );
    if (!result) {
      return new ResultError('Not able to update the category');
    }
    return new ResultSuccess(result);
  }

  async remove(id: string) {
    return await this.categoriesRepository.delete(id);
  }
}
