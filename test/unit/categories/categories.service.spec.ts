import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../../../src/@core/category/categories.service';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { ICategoriesRepository } from '../../../src/@core/category/repositories/icategory.repository';
import { PrismaCategoriesRepository } from '../../../src/@core/category/repositories/prisma-categories-repository';

describe('CategoriesService', () => {
  let service: CategoriesService;

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
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
