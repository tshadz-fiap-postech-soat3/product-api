import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesApi } from '../../../src/external/driver/categories.api';
import { CategoriesService } from '../../../src/@core/category/categories.service';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { ICategoriesRepository } from '../../../src/@core/category/repositories/icategory.repository';
import { PrismaCategoriesRepository } from '../../../src/@core/category/repositories/prisma-categories-repository';
import { CategoriesController } from '../../../src/@core/category/controller/categories.controller';
import { ICategoriesService } from '../../../src/@core/category/icategories.service';

describe('CategoriesApi', () => {
  let controller: CategoriesApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesApi],
      providers: [
        CategoriesController,
        {
          provide: ICategoriesService,
          useClass: CategoriesService,
        },
        {
          provide: ICategoriesRepository,
          useClass: PrismaCategoriesRepository,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<CategoriesApi>(CategoriesApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
