import { CategoryEntity } from '../../../src/@core/category/entitites/category';

describe('CategoryEntity', () => {
  let category: CategoryEntity;

  beforeEach(() => {
    category = new CategoryEntity('1', 'Test Category');
  });

  it('should create an instance of CategoryEntity', () => {
    expect(category).toBeInstanceOf(CategoryEntity);
  });

  it('should have the correct id', () => {
    expect(category.id).toBe('1');
  });

  it('should have the correct name', () => {
    expect(category.name).toBe('Test Category');
  });

  it('should have a createdAtDate property', () => {
    expect(category.createdAtDate).toBeInstanceOf(Date);
  });

  it('should have an updatedAtDate property', () => {
    expect(category.updatedAtDate).toBeInstanceOf(Date);
  });
});
