import { Result } from '../application/result/result';
import { CreateProductDto } from './entities/create-product.dto';
import { UpdateProductDto } from './entities/update-product.dto';
import { ProductEntity } from './entities/product';

export abstract class IProductsService {
  public abstract create(
    product: CreateProductDto,
  ): Promise<Result<ProductEntity>>;
  public abstract update(
    id: string,
    product: UpdateProductDto,
  ): Promise<Result<ProductEntity>>;
  public abstract findOne(category: string): Promise<Result<ProductEntity>>;
  public abstract findByName(name: string): Promise<Result<ProductEntity>>;
  public abstract findAll(): Promise<Result<ProductEntity[]>>;
  public abstract remove(id: string): Promise<void>;
}
