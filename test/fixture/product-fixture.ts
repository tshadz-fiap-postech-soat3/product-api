import { CreateProductDto } from 'src/@core/products/entities/create-product.dto';
import { ProductEntity } from 'src/@core/products/entities/product';

export const createProductDtoFixture = (): CreateProductDto => ({
  id: 'prod-1',
  name: 'X-Burguer',
  description: 'Pão, carne, queijo, alface, tomate e molho',
  categoryId: 'cat-1',
  price: 20,
});

export const updateProductDtoFixture = (): ProductEntity => ({
  id: 'prod-2',
  name: 'X-Bacon',
  description: 'Pão, carne, bacon, queijo, alface, tomate e molho',
  categoryId: 'cat-1',
  price: 30,
});

export const productsFixture = () => [
  {
    id: 'prod-1',
    name: 'X-Burguer',
    description: 'Pão, carne, queijo, alface, tomate e molho',
    categoryId: 'cat-1',
    price: 20,
  },
  {
    id: 'prod-2',
    name: 'X-Bacon',
    description: 'Pão, carne, bacon, queijo, alface, tomate e molho',
    categoryId: 'cat-1',
    price: 30,
  },
  {
    id: 'prod-3',
    name: 'Pudim',
    description: 'Pudim de leite ninho',
    categoryId: 'cat-4',
    price: 10,
  },
  {
    id: 'prod-4',
    name: 'Suco',
    description: 'Suco natural 500 mL',
    categoryId: 'cat-3',
    price: 8,
  },
  {
    id: 'prod-5',
    name: 'Bata frita',
    description: 'Porção generosa de batata frita',
    categoryId: 'cat-2',
    price: 10,
  },
];
