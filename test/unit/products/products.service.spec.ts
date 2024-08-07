import { Test, TestingModule } from '@nestjs/testing';

import { ResultError } from '../../../src/@core/application/result/result-error';
import { ResultSuccess } from '../../../src/@core/application/result/result-success';
import { ProductsService } from '../../../src/@core/products/products.service';
import { IProductsRepository } from '../../../src/@core/products/repositories/iproduct.repository';
import {
  createProductDtoFixture,
  productsFixture,
  updateProductDtoFixture,
} from '../../../test/fixture/product-fixture';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsRepository: IProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: IProductsRepository,
          useValue: {
            insert: jest.fn(),
            findAll: jest.fn(),
            findByCategory: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<IProductsRepository>(IProductsRepository);
  });
  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto = createProductDtoFixture();

      jest
        .spyOn(productsRepository, 'insert')
        .mockResolvedValue(createProductDto);

      const result = await service.create(createProductDto);

      expect(result).toEqual(new ResultSuccess(createProductDto));
      expect(productsRepository.insert).toHaveBeenCalledWith(createProductDto);
    });

    it('should return an error when create a product', async () => {
      const expectedResult = new ResultError('Not able to create the product');

      jest
        .spyOn(productsRepository, 'insert')
        .mockResolvedValue(Promise.resolve(null));

      const result = await service.create(createProductDtoFixture());

      expect(result).toEqual(expectedResult);
      expect(productsRepository.insert).toHaveBeenCalled();
    });
  });
  describe('findAll', () => {
    it('should find all products', async () => {
      const products = productsFixture();

      jest.spyOn(productsRepository, 'findAll').mockResolvedValue(products);

      const response = await service.findAll();

      expect(response).toEqual(new ResultSuccess(products));
      expect(productsRepository.findAll).toHaveBeenCalled();
    });

    it('should return an error when no products exist', async () => {
      const expectedResult = new ResultError('Product not exist');

      jest
        .spyOn(productsRepository, 'findAll')
        .mockResolvedValue(Promise.resolve(null));

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(productsRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find a product by category', async () => {
      const category = 'cat-1';
      const products = productsFixture();

      jest
        .spyOn(productsRepository, 'findByCategory')
        .mockResolvedValue(products[1]);

      const response = await service.findOne(category);

      expect(response).toEqual(new ResultSuccess(products[1]));
      expect(productsRepository.findByCategory).toHaveBeenCalledWith(category);
    });

    it('should return an error when no product exists for the category', async () => {
      const category = 'non-existent-category';
      const expectedResult = new ResultError('Product not exist');

      jest
        .spyOn(productsRepository, 'findByCategory')
        .mockResolvedValue(Promise.resolve(null));

      const result = await service.findOne(category);

      expect(result).toEqual(expectedResult);
      expect(productsRepository.findByCategory).toHaveBeenCalledWith(category);
    });
  });

  describe('findByName', () => {
    it('should find a product by name', async () => {
      const name = 'X-Burguer';
      const products = productsFixture();

      jest
        .spyOn(productsRepository, 'findByName')
        .mockResolvedValue(products[1]);

      const response = await service.findByName(name);

      expect(response).toEqual(new ResultSuccess(products[1]));
      expect(productsRepository.findByName).toHaveBeenCalledWith(name);
    });

    it('should return an error when no product exists with the name', async () => {
      const name = 'non-existent-product';
      const expectedResult = new ResultError('Product not exist');

      jest
        .spyOn(productsRepository, 'findByName')
        .mockResolvedValue(Promise.resolve(null));

      const result = await service.findByName(name);

      expect(result).toEqual(expectedResult);
      expect(productsRepository.findByName).toHaveBeenCalledWith(name);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = 'prod-20';
      const updateProductDto = updateProductDtoFixture();
      const updatedProduct = { ...updateProductDto, id };

      jest
        .spyOn(productsRepository, 'update')
        .mockResolvedValue(updatedProduct);

      const result = await service.update(id, updateProductDto);

      expect(result).toEqual(new ResultSuccess(updatedProduct));
      expect(productsRepository.update).toHaveBeenCalledWith(
        id,
        updateProductDto,
      );
    });

    it('should return an error when unable to update the product', async () => {
      const id = 'prod-6';
      const updateProductDto = updateProductDtoFixture();
      const expectedResult = new ResultError('Not able to update the product');

      jest
        .spyOn(productsRepository, 'update')
        .mockResolvedValue(Promise.resolve(null));

      const result = await service.update(id, updateProductDto);

      expect(result).toEqual(expectedResult);
      expect(productsRepository.update).toHaveBeenCalledWith(
        id,
        updateProductDto,
      );
    });
  });
  describe('remove', () => {
    it('should remove a product', async () => {
      const id = 'prod-1';

      await service.remove(id);

      expect(productsRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
