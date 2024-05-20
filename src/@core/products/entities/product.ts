export class ProductEntity {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;

  constructor(
    id: string,
    name: string,
    description: string,
    categoryId: string,
    price: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.categoryId = categoryId;
    this.price = price;
  }
}
