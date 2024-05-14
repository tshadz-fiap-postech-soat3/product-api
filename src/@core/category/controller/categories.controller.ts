import { Inject, Injectable } from '@nestjs/common';
import { ApplicationResult } from '../../application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../application/applicationResult/application-result-events';
import { ResultStatus } from '../../application/result/result-status';
import { ICategoriesController } from './icategories-controller';
import { ICategoriesService } from '../icategories.service';
import { CreateCategoryDto } from '../entitites/create-category.dto';
import { UpdateCategoryDto } from '../entitites/update-category.dto';

@Injectable()
export class CategoriesController implements ICategoriesController {
  constructor(
    @Inject(ICategoriesService)
    private categoriesService: ICategoriesService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const product = await this.categoriesService.findOne(
      createCategoryDto.name,
    );
    if (product.status !== ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Category already exists',
      );
    }
    const createdProduct =
      await this.categoriesService.create(createCategoryDto);
    if (createdProduct.status === ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Not able to create the category',
      );
    }
    return new ApplicationResult(
      ApplicationResultEvents.SUCCESS_CREATED,
      createdProduct as unknown as string,
    );
  }

  async findAll() {
    return await this.categoriesService.findAll();
  }

  async findOne(category: string) {
    return await this.categoriesService.findOne(category);
  }

  async update(id: string, updateProductDto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.categoriesService.remove(id);
  }
}
