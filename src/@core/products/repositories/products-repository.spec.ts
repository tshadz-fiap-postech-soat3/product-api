import { Test, TestingModule } from '@nestjs/testing';
import { PrismaProductsRepository } from './prisma-products-repository';
import { PrismaService } from '../../../external/driven/infra/database/prisma.service';

import {
  createProductDtoFixture,
  productsFixture,
  updateProductDtoFixture,
} from '../../../../test/fixture/product-fixture';

describe('PrismaProductsRepository', () => {
  let repository: PrismaProductsRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaProductsRepository,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
              update: jest.fn(),
              findFirst: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrismaProductsRepository>(PrismaProductsRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('insert', () => {
    it('should insert a new product', async () => {
      const createProductDto = createProductDtoFixture();

      jest
        .spyOn(prismaService.product, 'create')
        .mockResolvedValueOnce(createProductDto);

      const result = await repository.insert(createProductDto);

      expect(prismaService.product.create).toHaveBeenCalledWith({
        data: createProductDto,
      });
      expect(result).toEqual(createProductDto);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      const id = 'prod-20';
      const updateProductDto = updateProductDtoFixture();

      jest
        .spyOn(prismaService.product, 'update')
        .mockResolvedValueOnce(updateProductDto);

      const result = await repository.update(id, updateProductDto);

      expect(prismaService.product.update).toHaveBeenCalledWith({
        data: updateProductDto,
        where: { id },
      });
      expect(result).toEqual(updateProductDto);
    });
  });

  describe('findByCategory', () => {
    it('should find a product by category', async () => {
      const category = 'cat-1';
      const productEntity = productsFixture();

      jest
        .spyOn(prismaService.product, 'findFirst')
        .mockResolvedValueOnce(productEntity[1]);

      const result = await repository.findByCategory(category);

      expect(prismaService.product.findFirst).toHaveBeenCalledWith({
        where: { categoryId: category },
      });
      expect(result).toEqual(productEntity[1]);
    });
  });

  describe('findByName', () => {
    it('should find a product by name', async () => {
      const name = 'X-Burguer';
      const productEntity = productsFixture();

      jest
        .spyOn(prismaService.product, 'findFirst')
        .mockResolvedValueOnce(productEntity[1]);

      const result = await repository.findByName(name);

      expect(prismaService.product.findFirst).toHaveBeenCalledWith({
        where: { name },
      });
      expect(result).toEqual(productEntity[1]);
    });
  });

  describe('findAll', () => {
    it('should find all products', async () => {
      const productEntity = productsFixture();

      jest
        .spyOn(prismaService.product, 'findMany')
        .mockResolvedValueOnce(productEntity);

      const result = await repository.findAll();

      expect(prismaService.product.findMany).toHaveBeenCalled();
      expect(result).toEqual(productEntity);
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const id = 'prod-1';

      await repository.delete(id);

      expect(prismaService.product.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
