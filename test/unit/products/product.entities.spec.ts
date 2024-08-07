import { ProductEntity } from '../../../src/@core/products/entities/product';

describe('ProductEntity', () => {
  it('should create a new instance of ProductEntity', () => {
    // Arrange
    const id = '1';
    const name = 'Product 1';
    const description = 'This is product 1';
    const categoryId = 'category-1';
    const price = 10.99;

    // Act
    const product = new ProductEntity(id, name, description, categoryId, price);

    // Assert
    expect(product).toBeDefined();
    expect(product.id).toBe(id);
    expect(product.name).toBe(name);
    expect(product.description).toBe(description);
    expect(product.categoryId).toBe(categoryId);
    expect(product.price).toBe(price);
  });
});
