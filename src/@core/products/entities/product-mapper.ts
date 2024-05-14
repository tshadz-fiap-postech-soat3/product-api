import { CreateProductDto } from './create-product.dto';
import { ProductEntity } from './product';

export class ProductMapper {
  public id: string;
  public name: string;
  public description: string;
  public categoryId: string;
  public price: number;

  public constructor(data: CreateProductDto) {
    this.id = 'id';
    this.name = data.name;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.price = data.price;
  }

  public toDomain(): ProductEntity {
    return new ProductEntity(
      this.id,
      this.name,
      this.description,
      this.categoryId,
      this.price,
    );
  }
}
