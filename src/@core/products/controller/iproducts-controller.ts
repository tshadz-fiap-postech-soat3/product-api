import { ApplicationResult } from '../../application/applicationResult/application-result';
import { Result } from '../../application/result/result';
import { CreateProductDto } from '../entities/create-product.dto';
import { UpdateProductDto } from '../entities/update-product.dto';
import { ProductEntity } from '../entities/product';

export abstract class IProductsController {
  public abstract create(
    product: CreateProductDto,
  ): Promise<ApplicationResult<any>>;
  public abstract update(
    id: string,
    product: UpdateProductDto,
  ): Promise<Result<ProductEntity>>;
  public abstract findOne(name: string): Promise<Result<ProductEntity>>;
  public abstract findAll(): Promise<Result<ProductEntity[]>>;
  public abstract remove(id: string): Promise<void>;
}
