import { CreateProductDto } from '../entities/create-product.dto';
import { UpdateProductDto } from '../entities/update-product.dto';
import { ProductEntity } from '../entities/product';

export abstract class IProductsRepository {
  public abstract insert(product: CreateProductDto): Promise<ProductEntity>;
  public abstract update(
    id: string,
    product: UpdateProductDto,
  ): Promise<ProductEntity>;
  public abstract findByCategory(
    category: string,
  ): Promise<ProductEntity | null>;
  public abstract findByName(name: string): Promise<ProductEntity | null>;
  public abstract findAll(): Promise<ProductEntity[] | null>;
  public abstract delete(id: string): Promise<void>;
}
