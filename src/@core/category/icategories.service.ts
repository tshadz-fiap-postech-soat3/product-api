import { Result } from '../application/result/result';
import { UpdateCategoryDto } from './entitites/update-category.dto';
import { CategoryEntity } from './entitites/category';
import { CreateCategoryDto } from './entitites/create-category.dto';

export abstract class ICategoriesService {
  public abstract create(
    product: CreateCategoryDto,
  ): Promise<Result<CategoryEntity>>;
  public abstract update(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<Result<CategoryEntity>>;
  public abstract findOne(category: string): Promise<Result<CategoryEntity>>;
  public abstract findAll(): Promise<Result<CategoryEntity[]>>;
  public abstract remove(id: string): Promise<void>;
}
