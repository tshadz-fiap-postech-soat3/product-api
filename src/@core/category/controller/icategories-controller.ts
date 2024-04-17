
import { ApplicationResult } from '../../application/applicationResult/application-result';
import { Result } from '../../application/result/result';
import { CategoryEntity } from '../entitites/category';
import { CreateCategoryDto } from '../entitites/create-category.dto';
import { UpdateCategoryDto } from '../entitites/update-category.dto';

export abstract class ICategoriesController {
  public abstract create(
    product: CreateCategoryDto,
  ): Promise<ApplicationResult<any>>;
  public abstract update(
    id: string,
    product: UpdateCategoryDto,
  ): Promise<Result<CategoryEntity>>;
  public abstract findOne(name: string): Promise<Result<CategoryEntity>>;
  public abstract findAll(): Promise<Result<CategoryEntity[]>>;
  public abstract remove(id: string): Promise<void>;
}
