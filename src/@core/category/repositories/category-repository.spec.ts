import { Test, TestingModule } from '@nestjs/testing';
import { PrismaCategoriesRepository } from './prisma-categories-repository';
import { PrismaService } from '../../../external/driven/infra/database/prisma.service';

import {
  categoriesFixture,
  createCategoryDtoFixture,
  updateCategoryRepositoryFixture,
} from '../../../../test/fixture/category-fixture';

describe('PrismaCategoriesRepository', () => {
  let repository: PrismaCategoriesRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaCategoriesRepository,
        {
          provide: PrismaService,
          useValue: {
            category: {
              create: jest.fn(),
              update: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrismaCategoriesRepository>(
      PrismaCategoriesRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('insert', () => {
    it('should insert a new category', async () => {
      const createCategoryDto = createCategoryDtoFixture();

      jest
        .spyOn(prismaService.category, 'create')
        .mockResolvedValueOnce(createCategoryDto);

      const result = await repository.insert(createCategoryDto);

      expect(prismaService.category.create).toHaveBeenCalledWith({
        data: createCategoryDto,
      });
      expect(result).toEqual(createCategoryDto);
    });
  });

  describe('update', () => {
    it('should update an existing category', async () => {
      const id = 'category-id';
      const updateCategoryDto = updateCategoryRepositoryFixture();

      jest
        .spyOn(prismaService.category, 'update')
        .mockResolvedValueOnce(updateCategoryDto);

      const result = await repository.update(id, updateCategoryDto);

      expect(prismaService.category.update).toHaveBeenCalledWith({
        data: updateCategoryDto,
        where: { id },
      });
      expect(result).toEqual(updateCategoryDto);
    });
  });

  describe('findById', () => {
    it('should find a category by id', async () => {
      const id = 'cat-5';
      const categoryEntity = updateCategoryRepositoryFixture();

      jest
        .spyOn(prismaService.category, 'findUniqueOrThrow')
        .mockResolvedValueOnce(categoryEntity);

      const result = await repository.findById(id);

      expect(prismaService.category.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(categoryEntity);
    });
  });

  describe('findAll', () => {
    it('should find all categories', async () => {
      const categoryEntities = categoriesFixture();

      jest
        .spyOn(prismaService.category, 'findMany')
        .mockResolvedValueOnce(categoryEntities);

      const result = await repository.findAll();

      expect(prismaService.category.findMany).toHaveBeenCalled();
      expect(result).toEqual(categoryEntities);
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const id = 'cat-5';

      await repository.delete(id);

      expect(prismaService.category.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
