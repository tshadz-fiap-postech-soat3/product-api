import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../../../src/@core/category/categories.service';
import { CreateCategoryDto } from '../../../src/@core/category/entitites/create-category.dto';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { ICategoriesRepository } from '../../../src/@core/category/repositories/icategory.repository';
import { PrismaCategoriesRepository } from '../../../src/@core/category/repositories/prisma-categories-repository';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: PrismaService;

  const categoryMockedData: CreateCategoryDto = {
    id: 'test',
    name: 'test',
    createdAtDate: new Date(),
    updatedAtDate: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: ICategoriesRepository,
          useClass: PrismaCategoriesRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      prisma.category.findMany = jest
        .fn()
        .mockReturnValue([categoryMockedData]);

      const result = await service.findAll();

      expect(result).toEqual([categoryMockedData]);
      expect(prisma.category.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
